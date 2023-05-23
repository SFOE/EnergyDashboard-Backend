import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterNiederschlag } from '/opt/nodejs/models/wetter/wetter-niederschlag.model';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';

export interface WetterNiederschlagTrendApi extends DateModel, TrendModel {
    differenzZuNormProzent: number;
}

export const mapToApiModel = ({
                                  date,
                                  differenzZuNormProzent,
                                  trend,
                                  trendRating
                              }: WetterNiederschlag): WetterNiederschlagTrendApi => ({
    date,
    differenzZuNormProzent,
    trend,
    trendRating
});
