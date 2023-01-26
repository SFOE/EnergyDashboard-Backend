import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromVerbrauchHistoricalValueSource {
    Tag: string;
    Monat: string;
    Landesverbrauch_GWh_SG: string;
    SG_5y_Min: string;
    SG_5y_Max: string;
    SG_5y_Mittelwert: string;
    Landesverbrauch_prognose_SG_GWh: string;
    MA_Trend: string;
    Trend: string;
    TrendRating: string;
    Differenz_Mittelwert_prozent: string;
    Differenz_min_prozent: string;
    Differenz_max_prozent: string;
}

export interface StromVerbrauchHistoricalValue {
    id: string;
    tag: number;
    monat: number;
    landesverbrauch: number | null;
    landesverbrauchPrognose: number | null;
    trend: Trend;
    trendRating: TrendRating;
    trendMovingAverage: number;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const map = (records: StromVerbrauchHistoricalValueSource[]): StromVerbrauchHistoricalValue[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromVerbrauchHistoricalValueSource): StromVerbrauchHistoricalValue => ({
    id: createId(record.Monat, record.Tag),
    tag: parseInt(record.Tag),
    monat: parseInt(record.Monat),
    landesverbrauch: parseFloatOrNullForNA(record.Landesverbrauch_GWh_SG),
    landesverbrauchPrognose: parseFloatOrNullForNA(record.Landesverbrauch_prognose_SG_GWh),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
    trendMovingAverage: parseFloatOrNullForNA(record.MA_Trend),
    fiveYearMin: parseFloat(record.SG_5y_Min),
    fiveYearMax: parseFloat(record.SG_5y_Max),
    fiveYearMittelwert: parseFloat(record.SG_5y_Mittelwert),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert_prozent),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min_prozent),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max_prozent),
})

export const createId = (monat: string, tag: string) => {
    return `${monat}-${tag}`;
}
