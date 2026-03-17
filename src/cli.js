"use strict";

const { runCli } = require("./parser");

function main() {
    try {
        const result = runCli();
        process.stdout.write(
            [
                `Input: ${ result.inputPath }`,
                `Output JS: ${ result.appOutPath }`,
                `Output LanguageManager: ${ result.langOutPath }`,
                `Namespace: ${ result.namespaceRoot }`,
                `Translations: ${ result.translationCount }`
            ].join("\n") + "\n"
        );
    } catch (error) {
        process.stderr.write((error && error.stack) || String(error));
        process.stderr.write("\n");
        process.exitCode = 1;
    }
}

main();
