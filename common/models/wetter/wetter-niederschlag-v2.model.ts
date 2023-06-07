import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';

export interface WetterNiederschlagSourceV2 {
    Datum: string;
    Niederschlag_CH_gemessen_relativ_zu_Norm: string;
    Trend: string;
    s;
    TrendRating: string;
}

export interface WetterNiederschlagV2 extends BaseModel, DateModel, TrendModel {
    niederschlagGemessen: number;
}

export const map = (
    records: WetterNiederschlagSourceV2[]
): WetterNiederschlagV2[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterNiederschlagSourceV2
): WetterNiederschlagV2 => {
    return {
        id: getUuid(),
        date: source.Datum,
        niederschlagGemessen: parseFloat(source.Niederschlag_CH_gemessen_relativ_zu_Norm),
        trend: parseStringOrNullForNA(source.Trend) as Trend,
        trendRating: parseStringOrNullForNA(source.TrendRating) as TrendRating
    };
};