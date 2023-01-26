import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromImportExportNettoSource {
    Datum: string;
    AT_CH_GWh: string;
    DE_CH_GWh: string;
    FR_CH_GWh: string;
    IT_CH_GWh: string;
    CH_AT_GWh: string;
    CH_DE_GWh: string;
    CH_FR_GWh: string;
    CH_IT_GWh: string;
    Nettoimport_CH_GWh: string;
    Nettoimport_AT_GWh: string;
    Nettoimport_DE_GWh: string;
    Nettoimport_FR_GWh: string;
    Nettoimport_IT_GWh: string;
    Trend: string;
    MA_Trend: string;
    TrendRating: string;
}

export interface StromImportExportNetto {
    datum: string;
    import: StromImportExportCountries;
    export: StromImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
    trendMovingAverage: number;
}

export interface StromImportExportCountries {
    at: number;
    de: number;
    fr: number;
    it: number;
}

export const map = (records: StromImportExportNettoSource[]): StromImportExportNetto[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromImportExportNettoSource): StromImportExportNetto => ({
    datum: record.Datum,
    nettoImportCH: parseFloat(record.Nettoimport_CH_GWh),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
    trendMovingAverage: parseFloatOrNullForNA(record.MA_Trend),
    import: {
        at: parseFloat(record.AT_CH_GWh),
        de: parseFloat(record.DE_CH_GWh),
        fr: parseFloat(record.FR_CH_GWh),
        it: parseFloat(record.IT_CH_GWh),
    },
    export: {
        at: parseFloat(record.CH_AT_GWh),
        de: parseFloat(record.CH_DE_GWh),
        fr: parseFloat(record.CH_FR_GWh),
        it: parseFloat(record.CH_IT_GWh),
    },
})
