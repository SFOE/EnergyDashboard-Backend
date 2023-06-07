import { FiveYearWithDiffStatisticsModel } from '../base/statistics.model';
import { TrendModel } from '../base/trend.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface FuellstandGasspeicherSourceV2 {
    Speicherregion: string;
    Datum: string;
    Speicherstand_prozent: string;
    '5y_Min': string;
    '5y_Max': string;
    '5y_Mittelwert': string;
    Differenz_Mittelwert: string;
    Differenz_Min: string;
    Differenz_Max: string;
    Rolling_Mean: string;
    Trend_pp: string;
    Trend: string;
    TrendRating: string;
    Speicherstand_TWh: string;
}

export enum FuellstandGasspeicherRegionV2 {
    Austria = 'Austria',
    Germany = 'Germany',
    France = 'France',
    Italy = 'Italy',
    EU = 'EU'
}

export interface FuellstandGasspeicherV2
    extends BaseModel,
        DateModel,
        TrendModel,
        FiveYearWithDiffStatisticsModel {
    speicherstandProzent: number | null;
    speicherstandTWh: number | null;
    region: FuellstandGasspeicherRegionV2;
    rollingMean: number | null;
}

export const map = (
    records: FuellstandGasspeicherSourceV2[]
): FuellstandGasspeicherV2[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: FuellstandGasspeicherSourceV2
): FuellstandGasspeicherV2 => ({
    id: getUuid(),
    speicherstandProzent: parseFloatOrNullForNA(record.Speicherstand_prozent),
    speicherstandTWh: parseFloatOrNullForNA(record.Speicherstand_TWh),
    date: record.Datum,
    region: FuellstandGasspeicherRegionV2[record.Speicherregion],
    fiveYearMin: parseFloat(record['5y_Min']),
    fiveYearMax: parseFloat(record['5y_Max']),
    fiveYearMittelwert: parseFloat(record['5y_Mittelwert']),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert),
    differenzMin: parseFloatOrNullForNA(record.Differenz_Min),
    differenzMax: parseFloatOrNullForNA(record.Differenz_Max),
    rollingMean: parseFloatOrNullForNA(record.Rolling_Mean),
    trend: parseStringOrNullForNA(record.Trend) as Trend,
    trendRating: parseStringOrNullForNA(record.TrendRating) as TrendRating
});
