import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';

export interface FuellstandGasspeicherSource {
    Speicherstand_prozent: string;
    min: string;
    max: string;
    mittel: string;
    Monat: string;
    Tag: string;
    Speicherregion: string;
    Differenz_Mittelwert: string;
    Differenz_min: string;
    Differenz_max: string;
    MA_Trend: string;
    Trend: string;
    TrendRating: string;
    Speicherstand_TWh: string
}

export enum FuellstandGasspeicherRegion {
    Austria = 'Austria',
    Germany = 'Germany',
    France = 'France',
    Italy = 'Italy',
    EU = 'EU'
}

export interface FuellstandGasspeicher {
    id: string;
    speicherstandProzent: number | null;
    speicherstandTWh: number | null;
    min: number;
    max: number;
    mittel: number;
    monat: number;
    tag: number
    region: FuellstandGasspeicherRegion;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
    trendMovingAverage: number | null;
    trend: Trend | null;
    trendRating: TrendRating | null;
}

export const map = (records: FuellstandGasspeicherSource[]): FuellstandGasspeicher[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: FuellstandGasspeicherSource): FuellstandGasspeicher => ({
    id: createId(record.Speicherregion, record.Monat, record.Tag),
    speicherstandProzent: parseFloatOrNullForNA(record.Speicherstand_prozent),
    speicherstandTWh: parseFloatOrNullForNA(record.Speicherstand_TWh),
    region: FuellstandGasspeicherRegion[record.Speicherregion],
    min: parseFloat(record.min),
    max: parseFloat(record.max),
    mittel: parseFloat(record.mittel),
    monat: parseInt(record.Monat),
    tag: parseInt(record.Tag),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max),
    trendMovingAverage: parseFloatOrNullForNA(record.MA_Trend),
    trend: parseStringOrNullForNA(record.Trend) as Trend,
    trendRating: parseStringOrNullForNA(record.TrendRating) as TrendRating,
})

export const createId = (region: string, month: string, day: string) => {
    return `${region}-${month}-${day}`;
}
