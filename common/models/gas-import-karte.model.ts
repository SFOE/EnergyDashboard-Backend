import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface GasImportKarteSource {
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
    Trend_MA: string;
    TrendRating: string;
}

export interface GasImportKarte {
    datum: string;
    import: GasImportExportCountries;
    export: GasImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
    trendMovingAverage: number;
}

export interface GasImportExportCountries {
    at: number;
    de: number;
    fr: number;
    it: number;
}

export const map = (records: GasImportKarteSource[]): GasImportKarte[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: GasImportKarteSource): GasImportKarte => ({
    datum: record.Datum,
    nettoImportCH: parseFloat(record.Nettoimport_CH_GWh),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
    trendMovingAverage: parseFloatOrNullForNA(record.Trend_MA),
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
