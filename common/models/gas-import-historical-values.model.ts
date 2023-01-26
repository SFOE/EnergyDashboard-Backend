import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface GasImportHistoricalValueSource {
    Verbrauch: string;
    '5y_Min': string;
    '5y_Max': string;
    '5y_Mittelwert': string;
    Monat: string;
    Jahr: string;
    Differenz_Mittelwert: string;
    Differenz_min: string;
    Differenz_max: string;
    Trend: string;
    TrendRating: string;
}

export interface GasImportHistoricalValue {
    id: string;
    monat: number;
    jahr: number;
    nettoimport: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
    trend: Trend | null;
    trendRating: TrendRating | null;
}

export const map = (records: GasImportHistoricalValueSource[]): GasImportHistoricalValue[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: GasImportHistoricalValueSource): GasImportHistoricalValue => ({
    id: createId(record.Monat, record.Jahr),
    monat: parseInt(record.Monat),
    jahr: parseInt(record.Jahr),
    nettoimport: parseFloatOrNullForNA(record.Verbrauch),
    fiveYearMin: parseFloat(record['5y_Min']),
    fiveYearMax: parseFloat(record['5y_Max']),
    fiveYearMittelwert: parseFloat(record['5y_Mittelwert']),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
})

export const createId = (month: string, year: string) => {
    return `${month}-${year}`;
}
