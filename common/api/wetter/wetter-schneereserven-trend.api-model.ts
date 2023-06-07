import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterSchneereserven } from '/opt/nodejs/models/wetter/wetter-schneereserven.model';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';

export interface WetterSchneereservenTrendApi extends DateModel, TrendModel {
    aktuellMm: number;
}

export const mapToApiModel = ({
                                  date,
                                  aktuellMm,
                                  trend,
                                  trendRating
                              }: WetterSchneereserven): WetterSchneereservenTrendApi => ({
    date,
    aktuellMm,
    trend,
    trendRating
});
