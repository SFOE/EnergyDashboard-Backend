import { DateModel } from '/opt/nodejs/models/base/date.model';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';
import { StromProduktionPvTrend } from '/opt/nodejs/models/strom/strom-produktion-pv-trend.model';

export interface StromProduktionPvTrendApi extends DateModel, TrendModel {
    stromProduktion: number;
    pvAnteil: number;
}

export const mapToApiModel = ({
    date,
    stromProduktion,
    pvAnteil,
    trend,
    trendRating
}: StromProduktionPvTrend): StromProduktionPvTrendApi => ({
    date,
    stromProduktion,
    pvAnteil,
    trend,
    trendRating
});
