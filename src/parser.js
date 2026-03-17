"use strict";

const fs = require("fs");
const path = require("path");
const acorn = require("acorn");
const estraverse = require("estraverse");
const escodegen = require("escodegen");

const TRANSLATABLE_PROPERTIES = new Set([
    "title",
    "text",
    "fieldLabel",
    "boxLabel",
    "msg",
    "html"
]);

const FUNCTION_RULES = [
    { callee: "Retail.Utility.showErrors", indexes: [0] },
    { callee: "COMMON.Notificator.create", indexes: [2] },
    { callee: "COMMON.Notificator.success", indexes: [0] },
    { callee: "COMMON.Notificator.error", indexes: [0] }
];

function parseOptions(argv) {
    const options = {
        input: "application.js",
        outDir: "intl",
        helper: "ExtIntl.translate"
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (arg === "--input") {
            options.input = argv[index + 1];
            index += 1;
            continue;
        }
        if (arg === "--out-dir") {
            options.outDir = argv[index + 1];
            index += 1;
            continue;
        }
        if (arg === "--helper") {
            options.helper = argv[index + 1];
            index += 1;
        }
    }

    return options;
}

function literalToString(node) {
    if (!node) {
        return null;
    }

    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value;
    }

    if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
        return node.quasis[0] ? node.quasis[0].value.cooked : "";
    }

    return null;
}

function isBindingString(text) {
    return /^\s*\{[^{}]+\}\s*$/.test(text);
}

function looksLikeHtml(text) {
    if (!text || !text.includes("<")) {
        return false;
    }

    return /<\/?[a-z][\w:-]*\b[^>]*>/i.test(text);
}

function normalizeLabelSource(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .replace(/_+/g, "_")
        .toUpperCase();
}

function createLabelBuilder() {
    const textToLabel = new Map();
    const usedLabels = new Set();

    return function getLabelForText(text) {
        if (textToLabel.has(text)) {
            return textToLabel.get(text);
        }

        let base = normalizeLabelSource(text);
        if (!base) {
            base = "TEXT";
        }
        if (base.length > 48) {
            base = base.slice(0, 48).replace(/_+$/g, "");
        }

        let candidate = "LBL_" + base;
        let suffix = 2;
        while (usedLabels.has(candidate)) {
            candidate = "LBL_" + base + "_" + suffix;
            suffix += 1;
        }

        usedLabels.add(candidate);
        textToLabel.set(text, candidate);
        return candidate;
    };
}

function nodeToCalleeName(node) {
    if (!node) {
        return "";
    }

    if (node.type === "Identifier") {
        return node.name;
    }

    if (node.type === "ThisExpression") {
        return "this";
    }

    if (node.type === "MemberExpression" && !node.computed) {
        const objectName = nodeToCalleeName(node.object);
        const propertyName = nodeToCalleeName(node.property);
        if (objectName && propertyName) {
            return objectName + "." + propertyName;
        }
    }

    return "";
}

function expressionFromChain(chain) {
    const parts = chain.split(".");
    return parts.slice(1).reduce(
        (current, part) => ({
            type: "MemberExpression",
            object: current,
            property: { type: "Identifier", name: part },
            computed: false,
            optional: false
        }),
        { type: "Identifier", name: parts[0] }
    );
}

function createTranslateCall(helperName, namespaceRoot, label) {
    return {
        type: "CallExpression",
        callee: expressionFromChain(helperName),
        arguments: [
            { type: "Literal", value: namespaceRoot },
            { type: "Literal", value: label }
        ],
        optional: false
    };
}

function getPropertyName(node) {
    if (!node || node.type !== "Property" || node.computed) {
        return null;
    }

    if (node.key.type === "Identifier") {
        return node.key.name;
    }

    if (node.key.type === "Literal" && typeof node.key.value === "string") {
        return node.key.value;
    }

    return null;
}

function shouldTranslateText(text, propertyName) {
    if (typeof text !== "string") {
        return false;
    }

    const trimmed = text.trim();
    if (!trimmed) {
        return false;
    }
    if (trimmed.startsWith("LBL_")) {
        return false;
    }
    if (isBindingString(trimmed)) {
        return false;
    }
    if (propertyName === "html" && looksLikeHtml(trimmed)) {
        return false;
    }

    return true;
}

function getNamespaceRoot(ast) {
    let namespaceRoot = "Application";

    estraverse.traverse(ast, {
        enter(node) {
            if (
                node.type === "CallExpression" &&
                node.callee.type === "MemberExpression" &&
                !node.callee.computed &&
                node.callee.object.type === "Identifier" &&
                node.callee.object.name === "Ext" &&
                node.callee.property.type === "Identifier" &&
                node.callee.property.name === "define"
            ) {
                const className = literalToString(node.arguments[0]);
                if (className) {
                    namespaceRoot = className.split(".")[0] || className;
                    this.break();
                }
            }
        }
    });

    return namespaceRoot;
}

function collectAndTransform(source, helperName) {
    const ast = acorn.parse(source, {
        ecmaVersion: "latest",
        sourceType: "script"
    });

    const namespaceRoot = getNamespaceRoot(ast);
    const labelForText = createLabelBuilder();
    const translations = {};

    function replaceNode(node, propertyName) {
        const text = literalToString(node);
        if (!shouldTranslateText(text, propertyName)) {
            return node;
        }

        const label = labelForText(text);
        translations[label] = text;
        return createTranslateCall(helperName, namespaceRoot, label);
    }

    const transformed = estraverse.replace(ast, {
        enter(node) {
            if (node.type === "Property") {
                const propertyName = getPropertyName(node);
                if (!TRANSLATABLE_PROPERTIES.has(propertyName)) {
                    return undefined;
                }
                if (node.value.type === "CallExpression" && nodeToCalleeName(node.value.callee) === "COMMON.Translator.translate") {
                    return undefined;
                }
                node.value = replaceNode(node.value, propertyName);
                return node;
            }

            if (node.type === "CallExpression") {
                const calleeName = nodeToCalleeName(node.callee);
                const rule = FUNCTION_RULES.find((item) => item.callee === calleeName);
                if (!rule) {
                    return undefined;
                }

                rule.indexes.forEach((argIndex) => {
                    if (node.arguments[argIndex]) {
                        node.arguments[argIndex] = replaceNode(node.arguments[argIndex], null);
                    }
                });
                return node;
            }

            return undefined;
        }
    });

    const code = escodegen.generate(transformed, {
        format: {
            indent: {
                style: "    "
            },
            quotes: "single"
        }
    });

    return {
        code,
        namespaceRoot,
        translations
    };
}

function createLanguageManagerSource(namespaceRoot, translations) {
    const entries = Object.entries(translations);
    const lines = [];
    lines.push(`Ext.define('${ namespaceRoot }.Translation.LanguageManager', {`);
    lines.push("    statics: {");
    lines.push("        'it-IT': {");

    entries.forEach(([label, text], index) => {
        const escaped = JSON.stringify(text);
        const suffix = index === entries.length - 1 ? "" : ",";
        lines.push(`            '${ label }': ${ escaped }${ suffix }`);
    });

    lines.push("        }");
    lines.push("    }");
    lines.push("});");
    lines.push("");
    return lines.join("\n");
}

function ensureDirectory(targetPath) {
    fs.mkdirSync(targetPath, { recursive: true });
}

function runCli(rawOptions) {
    const options = rawOptions || parseOptions(process.argv.slice(2));
    const inputPath = path.resolve(options.input);
    const outRoot = path.resolve(options.outDir);
    const appOutPath = path.join(outRoot, "application.js");
    const langOutDir = path.join(outRoot, "translation");
    const langOutPath = path.join(langOutDir, "languagemanager.js");

    const source = fs.readFileSync(inputPath, "utf8");
    const result = collectAndTransform(source, options.helper);

    ensureDirectory(outRoot);
    ensureDirectory(langOutDir);
    fs.writeFileSync(appOutPath, result.code + "\n", "utf8");
    fs.writeFileSync(
        langOutPath,
        createLanguageManagerSource(result.namespaceRoot, result.translations),
        "utf8"
    );

    return {
        inputPath,
        appOutPath,
        langOutPath,
        namespaceRoot: result.namespaceRoot,
        translationCount: Object.keys(result.translations).length
    };
}

module.exports = {
    collectAndTransform,
    createLanguageManagerSource,
    parseOptions,
    runCli
};
