import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface WetterNiederschlagSource {
    Datum: string;
    Niederschlag_CH_gemessen_relativ_zu_Norm: string;
    Differenz_zu_Norm_Prozent: string;
    Trend: string;
    TrendRating: string;
}

export interface WetterNiederschlag extends BaseModel, DateModel, TrendModel {
    niederschlagGemessen: number;
    differenzZuNormProzent: number;
}

export const map = (
    records: WetterNiederschlagSource[]
): WetterNiederschlag[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterNiederschlagSource
): WetterNiederschlag => {
    return {
        id: getUuid(),
        date: source.Datum,
        niederschlagGemessen: parseFloat(source.Niederschlag_CH_gemessen_relativ_zu_Norm),
        differenzZuNormProzent: parseFloat(source.Differenz_zu_Norm_Prozent),
        trend: parseStringOrNullForNA(source.Trend) as Trend,
        trendRating: parseStringOrNullForNA(source.TrendRating) as TrendRating
    };
};