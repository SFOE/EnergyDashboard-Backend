import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';
import { parseFloatOrNullForNA, parseIntOrNullForNA } from "../utils/number.utils";

export interface StromFuellungsgradSpeicherseenSourceV2 {
    Region: string;
    Datum: string;
    Speicherstand_prozent: string;
    "5y_Min": string;
    "5y_Max": string;
    "5y_Mittelwert": string;
    Differenz_Mittelwert: string;
    Differenz_Min: string;
    Differenz_Max: string;
    hist_min: string;
    hist_min_und_Speicherreserve: string;
    Speicherinhalt_GWh: string;
    Speicherinhalt_100prozent_GWh: string;
    Rolling_Mean: string;
    Trend: string;
    TrendRating: string;
}

export enum StromFuellungsgradSpeicherseenRegionV2 {
    'Graubuenden' = 'graubuenden',
    'Tessin' = 'tessin',
    'Wallis' = 'wallis',
    'UebrigCH' = 'uebrigCH',
    'TotalCH' = 'totalCH'
}

export interface StromFuellungsgradSpeicherseenV2 extends BaseModel, DateModel {
    id: string,
    region: string,
    date: string;
    speicherstandProzent: number;
    speicherstandGWh: number;
    speicherstandBei100ProzentInGWh: number;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number;
    differenzMin: number;
    differenzMax: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
    rollingMean: number | null;
    trend: Trend;
    trendRating: TrendRating;
}

export const map = (records: StromFuellungsgradSpeicherseenSourceV2[]): StromFuellungsgradSpeicherseenV2[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromFuellungsgradSpeicherseenSourceV2): StromFuellungsgradSpeicherseenV2 => ({
    id: createId(record.Region, record.Datum),
    region: StromFuellungsgradSpeicherseenRegionV2[record.Region],
    date: record.Datum,
    speicherstandProzent: parseFloatOrNullForNA(record.Speicherstand_prozent),
    speicherstandGWh: parseFloatOrNullForNA(record.Speicherinhalt_GWh),
    speicherstandBei100ProzentInGWh: parseFloatOrNullForNA(record.Speicherinhalt_100prozent_GWh),
    fiveYearMin: parseFloat(record["5y_Min"]),
    fiveYearMax: parseFloat(record["5y_Max"]),
    fiveYearMittelwert: parseFloat(record["5y_Mittelwert"]),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert),
    differenzMin: parseIntOrNullForNA(record.Differenz_Min),
    differenzMax: parseFloatOrNullForNA(record.Differenz_Max),
    historicalMin: parseFloatOrNullForNA(record.hist_min),
    historicalMinWithReserves: parseFloatOrNullForNA(record.hist_min_und_Speicherreserve),
    rollingMean: parseFloatOrNullForNA(record.Rolling_Mean),
    trend: parseStringOrNullForNA(record.Trend) as Trend,
    trendRating: parseStringOrNullForNA(record.TrendRating) as TrendRating,
})

export const createId = (region: string, datum: string) => {
    return `${region}-${datum}`;
}

