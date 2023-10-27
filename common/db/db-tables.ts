import { SourceFiles } from '/opt/nodejs/source-files';

export const DynamoDBTables: { [key in SourceFiles]: string } = {
    [SourceFiles.STROM_FUELLUNGSGRAD_SPEICHERSEEN_V2]: `strom-fuellungsgrad-speicherseen-v2`,
    [SourceFiles.STROM_IMPORT_EXPORT_HISTORICAL_VALUES_V2]: `strom-import-export-historical-values-v2`,
    [SourceFiles.STROM_IMPORT_EXPORT_NETTO]: `strom-import-export-netto`,
    [SourceFiles.STROM_IMPORT_EXPORT_UEBERSICHT]: `strom-import-export-uebersicht`,
    [SourceFiles.STROM_PRODUKTIONSMIX]: `strom-produktionsmix`,
    [SourceFiles.STROM_PRODUKTION_IMPORT_VERBRAUCH]: `strom-produktion-import-verbrauch`,
    [SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_MIT_PROGNOSE_V2]: `strom-verbrauch-landesverbrauch-mit-prognose-v2`,
    [SourceFiles.STROM_VERBRAUCH_ENDVERBRAUCH_V2]: `strom-verbrauch-endverbrauch-v2`,
    [SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_VERGLEICH_V2]: `strom-verbrauch-landesverbrauch-vergleich-v2`,
    [SourceFiles.STROM_SPARZIEL_ZIEL_V4]: `strom-sparziel-ziel-v4`,
    [SourceFiles.STROM_SPARZIEL_ZIEL_V5]: `strom-sparziel-ziel-v5`,
    [SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V4]: `strom-sparziel-aktuelle-einsparung-v4`,
    [SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V5]: `strom-sparziel-aktuelle-einsparung-v5`,
    [SourceFiles.STROM_SPARZIEL_EINSPARUNG_PRO_MONAT_KUNDENGRUPPE_V2]: `strom-sparziel-einsparung-pro-monat-kundengruppe-v2`,
    [SourceFiles.STROM_SPARZIEL_EINSPARUNG_AKTUELLER_MONAT_KUNDENGRUPPE]: `strom-sparziel-einsparung-aktueller-monat-kundengruppe`,
    [SourceFiles.STROM_SPARZIEL_ZIEL_AKTUELLER_MONAT_KUNDENGRUPPE]: `strom-sparziel-ziel-aktueller-monat-kundengruppe`,
    [SourceFiles.STROM_SPARZIEL_5_PROZENT_PEAK_H]: `strom-sparziel-5-prozent-peak-h`,
    [SourceFiles.STROM_SPARZIEL_5_PROZENT_EINSPARUNGEN]: `strom-sparziel-5-prozent-einsparungen`,
    [SourceFiles.STROM_SPARZIEL_5_PROZENT_EINSPARUNGEN_V2]: `strom-sparziel-5-prozent-einsparungen-v2`,
    [SourceFiles.STROM_KKW_PRODUKTION_CH_V1]: `strom-kkw-produktion-ch-v1`,
    [SourceFiles.STROM_KKW_PRODUKTION_FR_V1]: `strom-kkw-produktion-fr-v1`,
    [SourceFiles.STROM_KKW_PRODUKTION_AUSFAELLE_V1]: `strom-kkw-ausfaelle-v1-p1`,
    [SourceFiles.STROM_KKW_PRODUKTION_VERFUEGBARKEIT]: `strom-kkw-verfuegbarkeit-p1`,

    [SourceFiles.GAS_FUELLSTAND_GASSPEICHER_V2]: `gas-fuellstand-gasspeicher-v2`,
    [SourceFiles.GAS_IMPORT_KARTE]: `gas-import-karte`,
    [SourceFiles.GAS_IMPORT_HISTORICAL_VALUES_V2]: `gas-import-historical-values-v2`,
    [SourceFiles.GAS_SPARZIEL_ZIEL_V4]: 'gas-sparziel-ziel-v4',
    [SourceFiles.GAS_SPARZIEL_ZIEL_V5]: 'gas-sparziel-ziel-v5',
    [SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG_V4]:
        'gas-sparziel-aktuelle-einsparung-v4',
    [SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG_V5]:
        'gas-sparziel-aktuelle-einsparung-v5',
    [SourceFiles.GAS_IMPORT_EUROPA_JAEHRLICH]: 'gas-import-europa-jaehrlich',
    [SourceFiles.GAS_IMPORT_EUROPA_TAEGLICH]: 'gas-import-europa-taeglich',
    [SourceFiles.GAS_IMPORT_EUROPA_TREND]: 'gas-import-europa-trend',

    [SourceFiles.PREISE_STROM_BOERSE]: 'preise-strom-boerse',
    [SourceFiles.PREISE_STROM_ENDVERBRAUCH]: 'preise-strom-endverbrauch',
    [SourceFiles.PREISE_STROM_FUTURES]: 'preise-strom-futures',
    [SourceFiles.PREISE_GAS_DAYAHEAD]: 'preise-gas-dayahead',
    [SourceFiles.PREISE_GAS_ENDVERBRAUCH]: 'preise-gas-endverbrauch',
    [SourceFiles.PREISE_GAS_FUTURES]: 'preise-gas-futures',
    [SourceFiles.PREISE_TREIBSTOFF_BLEIFREI]: 'preise-treibstoff-bleifrei',
    [SourceFiles.PREISE_TREIBSTOFF_DIESEL]: 'preise-treibstoff-diesel',
    [SourceFiles.PREISE_HEIZOEL_ENTWICKLUNG]: 'preise-heizoel-entwicklung',
    [SourceFiles.PREISE_BRENNHOLZ_ENDVERBRAUCH]:
        'preise-brennholz-endverbrauch',
    [SourceFiles.PREISE_FERNWAERME_ENDVERBRAUCH]:
        'preise-fernwaerme-endverbrauch',
    [SourceFiles.PREISE_STROM_EUROPA]: 'preise-strom-europa',
    [SourceFiles.PREISE_STROM_EUROPA_TREND]: 'preise-strom-europa-trend',

    [SourceFiles.WETTER_TEMPERATUR_AKTUELL]: 'wetter-temperatur-aktuell',
    [SourceFiles.WETTER_TEMPERATUR_PROGNOSE]: 'wetter-temperatur-prognose',
    [SourceFiles.WETTER_TEMPERATUR_TREND_V2]: 'wetter-temperatur-trend-v2',
    [SourceFiles.WETTER_NIEDERSCHLAG_V2]: 'wetter-niederschlag-v2',
    [SourceFiles.WETTER_NIEDERSCHLAG_BILDER_DATEN]:
        'wetter-niederschlag-bilder-daten',
    [SourceFiles.WETTER_SCHNEERESERVEN]: 'wetter-schneereserven',
    [SourceFiles.WETTER_HEIZGRADTAGE_ZEITREIHE]:
        'wetter-heizgradtage-zeitreihe',
    [SourceFiles.WETTER_HEIZGRADTAGE_TABELLE_DATEN]:
        'wetter-heizgradtage-tabelle-daten',
    [SourceFiles.WETTER_HEIZGRADTAGE_TREND]: 'wetter-heizgradtage-trend',

    [SourceFiles.DYNAMIC_TRANSLATIONS]: `dynamic-translations`,
    [SourceFiles.AMPEL]: `ampel`,
    [SourceFiles.SPARTIPPS_V2]: 'spartipps-v2'
};
