import { DateModel } from '../base/date.model';
import { TrendModel } from '../base/trend.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

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

export interface GasImportKarte extends BaseModel, DateModel, TrendModel {
    import: GasImportExportCountries;
    export: GasImportExportCountries;
    nettoImportCH: number;
    trendMovingAverage: number;
}

export interface GasImportExportCountries {
    at: number;
    de: number;
    fr: number;
    it: number;
}

export const map = (records: GasImportKarteSource[]): GasImportKarte[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (record: GasImportKarteSource): GasImportKarte => ({
    id: getUuid(),
    date: record.Datum,
    nettoImportCH: parseFloat(record.Nettoimport_CH_GWh),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
    trendMovingAverage: parseFloatOrNullForNA(record.Trend_MA),
    import: {
        at: parseFloat(record.AT_CH_GWh),
        de: parseFloat(record.DE_CH_GWh),
        fr: parseFloat(record.FR_CH_GWh),
        it: parseFloat(record.IT_CH_GWh)
    },
    export: {
        at: parseFloat(record.CH_AT_GWh),
        de: parseFloat(record.CH_DE_GWh),
        fr: parseFloat(record.CH_FR_GWh),
        it: parseFloat(record.CH_IT_GWh)
    }
});
