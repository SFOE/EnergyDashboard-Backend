import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { parseStringOrNullForNA } from '/opt/nodejs/utils/string.utils';

export interface StromProduktionPvTrendSource {
    Jahr: string;
    PV_produktion_GWh: string;
    pv_anteil: string;
    Trend: string;
    TrendRating: string;
}

export interface StromProduktionPvTrend extends BaseModel, DateModel, TrendModel {
    stromProduktion: number;
    pvAnteil: number;
}

export const map = (
    records: StromProduktionPvTrendSource[]
): StromProduktionPvTrend[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: StromProduktionPvTrendSource
): StromProduktionPvTrend => {
    return {
        id: getUuid(),
        date: source.Jahr,
        stromProduktion: parseFloat(source.PV_produktion_GWh),
        pvAnteil: parseFloat(source.pv_anteil),
        trend: parseStringOrNullForNA(source.Trend) as Trend,
        trendRating: parseStringOrNullForNA(source.TrendRating) as TrendRating
    };
};