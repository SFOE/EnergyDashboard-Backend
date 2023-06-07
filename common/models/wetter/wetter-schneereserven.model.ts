import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { FiveYearStatisticsModel } from '/opt/nodejs/models/base/statistics.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';

export interface WetterSchneereservenSource {
    Datum: string;
    Min: string;
    Mittelwert: string;
    Max: string;
    Aktuell_mm: string;
    Trend: string;
    TrendRating: string;
}

export interface WetterSchneereserven extends BaseModel, DateModel, FiveYearStatisticsModel, TrendModel {
    aktuellMm: number;
}

export const map = (
    records: WetterSchneereservenSource[]
): WetterSchneereserven[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterSchneereservenSource
): WetterSchneereserven => {
    return {
        id: getUuid(),
        date: source.Datum,
        fiveYearMin: parseFloat(source.Min),
        fiveYearMax: parseFloat(source.Max),
        fiveYearMittelwert: parseFloat(source.Mittelwert),
        aktuellMm: parseFloatOrNullForNA(source.Aktuell_mm),
        trend: Trend[source.Trend],
        trendRating: TrendRating[source.TrendRating]
    };
};