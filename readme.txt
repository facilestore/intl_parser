contesto extjs 

attualmente
SenchaCompiler.bat
il cui contenuto è :
@ECHO OFF
set senchaCmd=%1
IF "%1"=="" (
    set senchaCmd="sencha.exe"
)
%senchaCmd% package build & powershell -Command "(gc ./build/application-debug.js) -replace 'http://services.siacloud.bet', 'https://devservices.siacloud.com' | Out-File -encoding DEFAULT ./build/application.js" && powershell -Command "(gc ./build/application.js) -replace 'http://apps.siacloud.bet', 'https://devapps.siacloud.com' | Out-File -encoding DEFAULT ./build/application.js"



il mo scopo attuale e creare 
nella cartella corrente 
./intl/application.js (se non esiste creare tutta la struttura se esiste application.js sovrascrivere)

la versione di application.js internazionalizzata
come fare ? 

questi sono tutti esempi che si possono trovare in application.js


title: 'Prodotti / Lavorazioni' (proprieta con testo)
fieldLabel: 'CODICE AZIENDA' 	questo si
fieldLabel: ' cont testo diretto ' senza binding "{}";
text: 'CONFIGURAZIONE LOYALTY' si , 
text: '{column_text}' questo no perchè ce il binding, 
boxLabel: 'ABILITATO'
html: 'Se scegli un gruppo diverso, durante l\u2019iscrizione il cliente verrà assegnato al gruppo selezionato. Se selezioni Nessun gruppo o lasci il campo vuoto, il cliente resterà nel gruppo attuale.'
 
le proprieta non devono avere  COMMON.Translator
 
title: COMMON.Translator.translate("goodsTransferV2", "LBL_REMOVE_BARCODE"), questi casi non vanno interpretati
msg: COMMON.Translator.translate("goodsTransferV2", "LBL_CONFIRM_REMOVE_BARCODE"),

questi per esempio si
title: "Ordine Trasferimento",
msg: "ci sono delle differenze rispetto all'ordine,vuoi continuare comunque ?",

Retail.Utility.showErrors('Demone Retail non impostato'); 
COMMON.Notificator.create(this.getNamespace(), "items-selector", 'Stagione anno abbligatoria')
COMMON.Notificator.success("BARCODES SALVATI CON SUCCESSO");
COMMON.Notificator.error("deve essere impostato anche il prezzo outlet della prima taglia");

lo scopo è estrarre tutti i testi dal file 
e sostituire con una testo che un helper esterno (gia esistente possa occuparsi della traduzione)
se il testo inizia con `LBL_` non deve essere processato in quanto già è stato definita l'etichetta di traduzione
se html: contiente del codice html valido: non va processato altrimenti si

voglio creare processo node
che faccia tutto i lavoro e faccia le sostituzioni nel application.js
e crei nella stessa cartella il file 
./intl/translation/languagemanager.js
fatto in questo modo
Ext.define('goodsTransferV2 (nome della classe in application.js).Translation.LanguageManager', {
	statics: {
		"it-IT": {
			"LBL_TIPO": "Tipo",
			"LBL_NEW_TRANSFER":"Nuovo passaggio merce",
			"LBL_FROM_DATE":"Dal",
			"LBL_TO_DATE":"Al",
			"LBL_FROM_STORE":"Partenza",
			"LBL_TO_STORE":"Destinazione",
			"LBL_OPEN":"Aperti",
			"LBL_CLOSE":"Chiusi",
			"LBL_CANCEL":"Annulla",
			"LBL_CONFIRM":"Conferma",
			"LBL_CODE":"codice",
			"LBL_DESCRIPTION":"Quantità",
			"LBL_DESCRIPTION":"Descrizione prodotto",
			"LBL_ELENCO_ARTICOLI":"Elenco articoli",
			"LBL_QUANTITY":"Quantità",
			"LBL_BARCODE":"Barcode",
			"LBL_PRESAVETRANSFER":"Salva passaggio",
			"LBL_SAVE_TEMPORARY":"Salva provvisorio",
			"LBL_SAVE_CLOSE":"Salva definitivo",
			"LBL_PRINT":"Stampa",
			"LBL_SAVEPRINT":"Salva e stampa",
 		    "LBL_DESTINATIONSTORE": "Magazzino destinazione",
            "LBL_DESTINATIONSTORE": "Magazzino destinazione",
			"LBL_ADDRESS": "Indirizzo",
			"LBL_ZIPCODE": "Cap",
			"LBL_LOCATION": "Localit\u00e0\/Citt\u00e0",
			"LBL_LOCATION_ABBR": "(Provincia)",
			"LBL_STORE_DESCRIPTION": "Magazzino destinazione",
			"LBL_DOCUMENTDATE": "Data Documento",
			"LBL_SHIPPINGDATE": "Data Trasporto",
			"LBL_HOUR": "Ora",
			"LBL_SHIPPINGPAIDBY": "Spedizione a Mezzo",
			"LBL_SENDER": "Mittente",
			"LBL_RECIPIENT": "Destinatario",
			"LBL_COMPANY": "Azienda",
			"LBL_VEHICLECOMPANY": "Vettore",
			"LBL_ASPECTGOOD": "Aspetto esteriore beni",
			"LBL_PARCELSNUMBER": "Numero Colli",
			"LBL_FREIGHT": "Porto",
			"LBL_FREE": "Franco",
			"LBL_ASSIGNED": "Assegnato",
			"LBL_WEIGHT": "Peso (Kg)",
			"LBL_FULLNESS": "Volume (Mq)",
			"LBL_TRANSPORTREASON": "Causale Trasporto",
			"LBL_FIND":"Cerca",
			"LBL_SEARCH":"Cerca Articoli",
			"LBL_TERMINAL_READER":"Leggi da terminale",
			"LBL_SEND_DATA":"Invia dati",
			"LBL_FROMSTORE":"Magazzino partenza",
			"LBL_NOTITEMSELECTED":"Nessun articolo selezionato",
			"LBL_PIECES":"Pezzi",
			"LBL_NUM_DOC":"Numero documento",
			"LBL_TRANSFER_ISCLOSE":"il passaggio è chiuso impossibile cancellare",
			"LBL_TITLE_REMOVE":"Cancella passaggio",
			"LBL_ASK_REMOVE":"Vuoi cancellare il passaggio ?",
			"LBL_STOREFROM_NOTSET":"Magazzino non impostato",
			"LBL_STORETO_NOTSET":"Magazzino destinazione non impostato",
			"LBL_DATASHIP_NOTSET":"Data trasporto non impostata",
			"LBL_DATASHIP_NOTSET":"Data trasporto non impostata",
			"LBL_DOCDATE_NOTSET":"Data documento non impostato",
			"LBL_HOURSHIP_NOTSET":"Ora trasport non impostata",
			"LBL_ASPECT_GOODS":"Aspetto beni non impostata",
			"LBL_COLLI_NOTSET":"Numero colli non impostato",
			"LBL_CAUSTRAN_NOTSET":"Causale traspo non impostato",
			"LBL_PRINT_DOC":"Stampa documento",
			"LBL_PRINT_PACKING_LIST":"Stampa packing list",
			"LBL_NOSELECTORDER":"Nessun ordine selezionato",
			"LBL_NEW_TRANSFERORDER":"Nuovo passaggio comandato",
			"LBL_TRANSFER_ORDERS":"Ordini di trasferimento",
			"LBL_NUMBERO":"Numero ordine",
			"LBL_DEST_STORE":"Destinazione",
			"LBL_LIMIT_DATE":"Completare entro il",
			"LBL_NOPRODUCTINORDER":"Non sono presenti articoli nell'ordine selezionato",
			"LBL_PRODUCTNOTAVAILABLEINLIST":"Articolo non presente nell'ordine",
			"LBL_SUCCESSSAVE":"Passaggio salvato con successo",
			"LBL_REOPEN-TRANSFER":"Riapri passaggio merce",
			"LBL_TITLE_REOPEN":"Riapertura documento",
			"LBL_ASK_REOPEN":"Sei sicuro di voler riaprire il documento ?",
			"LBL_DECODE_ERRORS":"Articoli non reperiti",
			"LBL_TITLE_CANCEL":"Annulla operazione",
			"LBL_ASK_CANCEL":"Annullare le modifiche ?",
			"LBL_CONFIRM_REMOVE_BARCODE":"Vuoi eliminare il barcode ?",
			"LBL_REMOVE_BARCODE":"Elimina barcode",
			"LBL_SAVE":"Salva",
			"LBL_CREATE_DATE":"Data immissione",
			"LBL_DATE_DOC":"Data Doc.",
			"LBL_RESET_FILTER":"Annulla filtri articoli",
			"LBL_NUMDOC": "Numero Doc.",
			"LBL_OPERATOR": "( Operatore )",
			"LBL_DESTINATION": "Destinazione",
			"LBL_PIECES": "Pezzi",
			"LBL_SETSTARTDATE":"Imposta il perido di partenza",
			"LBL_SETENDDATE":"Imposta la fine del periodo",
			"LBL_SETDESTSTORE":"Imposta il magazzino di desinazione",
			"LBL_FILTER_LIST":"Filtra elenco",
			"LBL_ITEM_FILTER":"Filtra lista articoli",
			"LBL_SAVEHEAD":"Salva dati testata",
			"LBL_BEFOREDATETRANSPORT":"La data di trasporto non può essere minore della data documento",
			"LBL_DATETRANSPORTBEFORENOW":"Ora trasporto deve essere maggiore o uguale di adesso",
			"LBL_DEFECTED_INOTHERTRANSFER": "presenti articoli difettati in altri trasferimenti aperti !",
			"LBL_NOTPRINTDOCUMENT":"Impossibile stampare il documento",
			"LBL_SAVEDOKNOTPRINTDOCUMENT":"Documento salvato,impossibile stampare il documento",
			"LBL_BARCODE_NONSETTED":"Barcode non impostato",
			"LBL_BARCODE_ALREADY_INSERT":"Barcode già inserito,per gli altricoli tracciabli non è possibile leggere più di una volta lo stesso barcode",
			"LBL_CLOSE_WND":"Chiudi finestra",
			"LBL_BARCODE_ALREADY_INSERT_OTHER_DOC":"barcode già inserito in un altro passaggio",
			"LBL_FIND":"Cerca"
		},
			}
});

per esempio 
Ext.define('goodsTransferV2.view.selectStoreWndViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.selectstorewnd',
    requires: [
        'Ext.data.Store',
        'Ext.data.field.String',
        'Ext.app.bind.Formula'
    ],
    stores: {
        magazzini: {
            stopParse: true,
            fields: [
                {
                    type: 'string',
                    name: 'id'
                },
                {
                    name: 'descrizione'
                },
                {
                    name: 'descrizione2'
                },
                {
                    name: 'indirizzo'
                },
                {
                    name: 'localita'
                },
                {
                    name: 'cap'
                },
                {
                    name: 'provincia_codice'
                },
                {
                    name: 'provincia_descrizione'
                },
                {
                    name: 'stato_codice'
                },
                {
                    name: 'stato_descrizione'
                },
                {
                    name: 'regione_codice'
                },
                {
                    name: 'regione_descrizione'
                },
                {
                    name: 'default_cluster'
                },
                {
                    name: 'default_cluster_descrizione'
                },
                {
                    name: 'tipo_rapporto'
                },
                {
                    name: 'ecommerce'
                },
                {
                    name: 'tipo_magazzino_code'
                },
                {
                    name: 'tipo_magazzino_desc'
                },
                {
                    name: 'magazzino_dettaglio'
                },
                {
                    name: 'conto_vendita'
                },
                {
                    name: 'tipo_restocking'
                },
                {
                    name: 'magazzino_ecommercecorrelati'
                }
            ]
        },
        destinazione: {
            stopParse: true,
            fields: [
                {
                    name: 'CODICE'
                },
                {
                    name: 'DESCRIZIONE'
                },
                {
                    name: 'DESCRIZIONE2'
                }
            ]
        }
    },
    formulas: {
        cmb_orig_label: {
            get: function(data) {
                return data ? '' : 'Magazzino origine';
            },
            bind: '{hide_combo_label}'
        },
        cmb_dest_label: {
            get: function(data) {
                return data ? '' : 'Magazzino Destinazione';
            },
            bind: '{hide_combo_label}'
        }
    }
});

/*
 * File: app/view/selectStoreWndViewController.js
 *
 * This file was generated by Sencha Architect version 4.2.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */
Ext.define('goodsTransferV2.view.selectStoreWndViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.selectstorewnd',
    cancel: function() {
        const view = this.getView();
        view.fireEvent('cancel', view);
    },
    confirm: function() {
        const view = this.getView();
        const refs = this.getReferences();
        const store_orig = refs.cmb_orig.getValue();
        const store_dest = refs.cmb_dest.getValue();
        const selectDestinazione = view.getSelect_destination() || false;
        let validation = true;
        let error_msg = "";
        if (!store_orig) {
            validation = false;
            error_msg = "Selezione magazzino di origine";
        }
        if (selectDestinazione && !store_dest) {
            validation = false;
            error_msg = "Selezione magazzino di destinazione";
        }
        if (!validation) {
            Retail.Utility.showErrors(error_msg, true);
            return;
        }
        let result = "";
        if (!selectDestinazione) {
            result = store_orig;
        } else {
            result = {
                magazzino_origine: store_orig,
                magazzino_destinazione: store_dest
            };
        }
        view.fireEvent('confirm', result, view);
    },
    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        const component = this.getView();
        if (component.getSelect_destination()) {
            const refs = this.getReferences();
            refs.cmb_dest.setValue(null);
            const record = field.getSelectedRecord() || null;
            if (record) {
                const correlati = record.get("correlati") || [];
                const store = this.getStore("destinazione");
                store.loadData(correlati, false);
            }
        }
    },
    onWindowBoxReady: function(component, width, height, eOpts) {
        const {
                magazzini
            } = (goodsTransferV2.app.getMainCntController().tables || {});
        const refs = this.getReferences();
        const store = this.getStore("magazzini");
        const vm = this.getViewModel();
        store.loadData(magazzini || [], false);
        const selectOrigine = vm.get("selectOrigine");
        const selectDestinazione = component.getSelect_destination() || false;
        const account_store = vm.get("account_store");
        if (!selectOrigine) {
            refs.cmb_orig.setReadOnly(true);
            refs.cmb_orig.setValue(account_store);
        }
        if (!selectDestinazione) {
            refs.cmb_dest.hide();
        }
    },
    onWindowBeforeRender: function(component, eOpts) {
        const daemon = CloudDesktop.app.getDaemon("Retail.Daemon");
        const vm = this.getViewModel();
        const selectOrigine = Retail.Auth.User.isADMIN() || Retail.Auth.User.isOPERATORE();
        const account_store = daemon.getProperty("ENVRETAIL_STORE_CODE") + '';
        const hide_combo_label = component.getHide_combo_label();
        vm.setData({
            selectOrigine,
            account_store,
            hide_combo_label
        });
    }
});

/*
 * File: app/view/selectStoreWnd.js
 *
 * This file was generated by Sencha Architect version 4.2.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */
Ext.define('goodsTransferV2.view.selectStoreWnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.selectstorewnd',
    requires: [
        'goodsTransferV2.view.selectStoreWndViewModel',
        'goodsTransferV2.view.selectStoreWndViewController',
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
    ],
    config: {
        hide_combo_label: true,
        select_destination: false
    },
    controller: 'selectstorewnd',
    viewModel: {
        type: 'selectstorewnd'
    },
    modal: true,
    height: 250,
    width: 400,
    title: 'Seleziona il magazzino di origine',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cmb_orig',
                    width: '85%',
                    labelAlign: 'top',
                    displayField: 'descrizione',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    bind: {
                        fieldLabel: '{cmb_orig_label}',
                        store: '{magazzini}'
                    },
                    listeners: {
                        change: 'onComboboxChange'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'cmb_dest',
                    width: '85%',
                    labelAlign: 'top',
                    displayField: 'DESCRIZIONE',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'CODICE',
                    bind: {
                        fieldLabel: '{cmb_dest_label}',
                        store: '{destinazione}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            padding: 5,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'button',
                    padding: '5',
                    cls: 'squaredbutton red',
                    iconCls: 'cancel24-icon',
                    text: 'ANNULLA',
                    bind: {
                        handler: 'cancel'
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'button',
                    cls: 'squaredbutton green',
                    iconCls: 'confirm24-icon',
                    text: 'CONFERMA',
                    bind: {
                        handler: 'confirm'
                    }
                }
            ]
        }
    ],
    listeners: {
        boxready: 'onWindowBoxReady',
        beforerender: 'onWindowBeforeRender'
    }
});

/*
 * File: app/view/serialiWndViewModel.js
 *
 * This file was generated by Sencha Architect version 4.2.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */
Ext.define('goodsTransferV2.view.serialiWndViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.goodstransferv2serialiwnd',
    requires: [
        'Ext.data.Store',
        'Ext.data.field.Field'
    ],
    stores: {
        bcs: {
            fields: [
                {
                    name: 'barcode'
                }
            ]
        }
    }
});

/*
 * File: app/view/serialiWndViewController.js
 *
 * This file was generated by Sencha Architect version 4.2.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */
Ext.define('goodsTransferV2.view.serialiWndViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.goodstransferv2serialiwnd',
    removeBARCODE: function(record) {
        var view = this.getView();
        var dati = view.getRecord() || null;
        var dettagli = dati.get("DETTAGLI");
        var bcs = this.getStore('bcs');
        if (dati) {
            var removeBarcode = function(barcode) {
                    if (dettagli && dettagli[barcode]) {
                        delete dettagli[barcode];
                        view.fireEvent('removeBarcode', dettagli);
                    }
                };
            Ext.Msg.show({
                title: COMMON.Translator.translate("goodsTransferV2", "LBL_REMOVE_BARCODE"),
                msg: COMMON.Translator.translate("goodsTransferV2", "LBL_CONFIRM_REMOVE_BARCODE"),
                buttons: Ext.Msg.YESNO,
                fn: function(btn) {
                    if (btn === 'yes') {
                        removeBarcode(record.get("barcode"));
                        bcs.remove(record);
                        if (Ext.Object.getKeys(dettagli).length === 0) {
                            view.fireEvent('removeProduct', dati, view);
                        }
                        return;
                    }
                },
                icon: Ext.window.MessageBox.QUESTION
            });
        }
    },
    cancel: function() {
        var view = this.getView();
        view.fireEvent('cancel', view);
    },
    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        var store = this.getStore('bcs');
        var barcode = field.getValue() || "";
        store.clearFilter(true);
        store.filterBy(function(rc) {
            return (rc.get("barcode") + "" || "").startsWith(barcode);
        });
    },
    onWindowBoxReady: function(component, width, height, eOpts) {
        var view = this.getView();
        var dati = view.getRecord() || null;
        if (dati) {
            var dettagli = dati.get("DETTAGLI");
            var keys = Ext.Object.getKeys(dettagli) || [];
            var store = this.getStore('bcs');
            store.loadData(keys.map(function(k) {
                return {
                    barcode: k
                };
            }), false);
        }
    }
});

/*
 * File: app/view/serialiWnd.js
 *
 * This file was generated by Sencha Architect version 4.2.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */
Ext.define('goodsTransferV2.view.serialiWnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.goodstransferv2serialiwnd',
    requires: [
        'goodsTransferV2.view.serialiWndViewModel',
        'goodsTransferV2.view.serialiWndViewController',
        'Ext.plugin.Responsive',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],
    config: {
        record: null,
        interactionType: null
    },
    controller: 'goodstransferv2serialiwnd',
    viewModel: {
        type: 'goodstransferv2serialiwnd'
    },
    modal: true,
    cls: 'text-small',
    draggable: false,
    height: 400,
    resizable: false,
    width: 300,
    responsiveFormulas: {
        interactionType: function(contex) {
            if (this && this.cmp && Ext.isString(this.cmp.interactionType)) {
                return this.cmp.interactionType;
            } else {
                return "";
            }
        }
    },
    closable: false,
    title: 'LBL_BARCODE',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'gridpanel',
            flex: 1,
            title: '',
            forceFit: true,
            bind: {
                store: '{bcs}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'barcode',
                    text: ''
                },
                {
                    xtype: 'actioncolumn',
                    maxWidth: 40,
                    responsiveConfig: {
                        'interactionType=="VIEW"': {
                            hidden: true
                        }
                    },
                    tdCls: 'td-gridcellbutton red',
                    items: [
                        {
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                var controller = view.lookupController();
                                if (controller) {
                                    controller.removeBARCODE(record, false);
                                }
                            },
                            iconCls: 'cancel16-icon'
                        }
                    ],
                    plugins: [
                        {
....................








