import { parseIntOrNullForNA } from '../utils/number.utils';
import { FiveYearWithDiffStatisticsModel } from './base/statistics.model';
import { TrendModel } from './base/trend.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';

export interface FuellungsgradSpeicherseenSource {
    Region: string;
    Kalenderwoche: string;
    Speicherstand_prozent: string;
    '5y_Min': string;
    '5y_Max': string;
    '5y_Mittelwert': string;
    Differenz_Mittelwert: string;
    Differenz_min: string;
    Differenz_max: string;
    hist_min: string;
    hist_min_und_Speicherreserve: string;
    PP_Trend: string;
    Trend: string;
    TrendRating: string;
}

export enum Region {
    'Graubuenden' = 'graubuenden',
    'Tessin' = 'tessin',
    'Wallis' = 'wallis',
    'UebrigCH' = 'uebrigCH',
    'TotalCH' = 'totalCH'
}

export interface FuellungsgradSpeicherseen
    extends FiveYearWithDiffStatisticsModel,
        TrendModel {
    region: string;
    kalenderwoche: number;
    speicherstandProzent: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
    trendMovingAverage: number;
}

export const map = (
    records: FuellungsgradSpeicherseenSource[]
): FuellungsgradSpeicherseen[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: FuellungsgradSpeicherseenSource
): FuellungsgradSpeicherseen => ({
    region: Region[record.Region],
    kalenderwoche: parseInt(record.Kalenderwoche),
    speicherstandProzent: parseIntOrNullForNA(record.Speicherstand_prozent),
    fiveYearMin: parseInt(record['5y_Min']),
    fiveYearMax: parseInt(record['5y_Max']),
    fiveYearMittelwert: parseInt(record['5y_Mittelwert']),
    differenzMittelwert: parseIntOrNullForNA(record.Differenz_Mittelwert),
    differenzMin: parseIntOrNullForNA(record.Differenz_min),
    differenzMax: parseIntOrNullForNA(record.Differenz_max),
    historicalMin: parseIntOrNullForNA(record.hist_min),
    historicalMinWithReserves: parseIntOrNullForNA(
        record.hist_min_und_Speicherreserve
    ),
    trendMovingAverage: parseIntOrNullForNA(record.PP_Trend),
    trend: parseStringOrNullForNA(record.Trend) as Trend,
    trendRating: parseStringOrNullForNA(record.TrendRating) as TrendRating
});
