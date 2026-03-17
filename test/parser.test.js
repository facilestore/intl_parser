"use strict";

const assert = require("assert");
const { collectAndTransform, createLanguageManagerSource } = require("../src/parser");

const source = `
Ext.define('goodsTransferV2.view.selectStoreWnd', {
    title: 'Seleziona il magazzino di origine',
    html: 'Testo semplice',
    html2: '<div>Non toccare</div>',
    text: '{column_text}',
    fieldLabel: 'CODICE AZIENDA',
    boxLabel: 'LBL_BARCODE',
    title2: COMMON.Translator.translate("goodsTransferV2", "LBL_REMOVE_BARCODE"),
    items: [{
        xtype: 'button',
        text: 'CONFERMA'
    }],
    listeners: {
        click: function() {
            Retail.Utility.showErrors('Demone Retail non impostato');
            COMMON.Notificator.create(this.getNamespace(), 'items-selector', 'Stagione anno abbligatoria');
            COMMON.Notificator.success("BARCODES SALVATI CON SUCCESSO");
        }
    }
});
`;

const result = collectAndTransform(source, "ExtIntl.translate");

assert.equal(result.namespaceRoot, "goodsTransferV2");
assert.ok(result.code.includes("title: ExtIntl.translate('goodsTransferV2', 'LBL_SELEZIONA_IL_MAGAZZINO_DI_ORIGINE')"));
assert.ok(result.code.includes("fieldLabel: ExtIntl.translate('goodsTransferV2', 'LBL_CODICE_AZIENDA')"));
assert.ok(result.code.includes("text: '{column_text}'"));
assert.ok(result.code.includes("boxLabel: 'LBL_BARCODE'"));
assert.ok(result.code.includes("title2: COMMON.Translator.translate('goodsTransferV2', 'LBL_REMOVE_BARCODE')"));
assert.ok(result.code.includes("Retail.Utility.showErrors(ExtIntl.translate('goodsTransferV2', 'LBL_DEMONE_RETAIL_NON_IMPOSTATO'));"));
assert.ok(result.code.includes("COMMON.Notificator.create(this.getNamespace(), 'items-selector', ExtIntl.translate('goodsTransferV2', 'LBL_STAGIONE_ANNO_ABBLIGATORIA'));"));
assert.ok(result.code.includes("COMMON.Notificator.success(ExtIntl.translate('goodsTransferV2', 'LBL_BARCODES_SALVATI_CON_SUCCESSO'));"));
assert.deepEqual(result.translations, {
    LBL_SELEZIONA_IL_MAGAZZINO_DI_ORIGINE: "Seleziona il magazzino di origine",
    LBL_TESTO_SEMPLICE: "Testo semplice",
    LBL_CODICE_AZIENDA: "CODICE AZIENDA",
    LBL_CONFERMA: "CONFERMA",
    LBL_DEMONE_RETAIL_NON_IMPOSTATO: "Demone Retail non impostato",
    LBL_STAGIONE_ANNO_ABBLIGATORIA: "Stagione anno abbligatoria",
    LBL_BARCODES_SALVATI_CON_SUCCESSO: "BARCODES SALVATI CON SUCCESSO"
});

const languageManager = createLanguageManagerSource(result.namespaceRoot, result.translations);
assert.ok(languageManager.includes("Ext.define('goodsTransferV2.Translation.LanguageManager'"));
assert.ok(languageManager.includes("'LBL_CONFERMA': \"CONFERMA\""));

process.stdout.write("parser.test.js passed\n");
