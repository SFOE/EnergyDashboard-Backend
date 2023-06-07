import { DateModel } from '/opt/nodejs/models/base/date.model';
import { TrendModel } from '/opt/nodejs/models/base/trend.model';
import { WetterNiederschlagV2 } from '/opt/nodejs/models/wetter/wetter-niederschlag-v2.model';

export interface WetterNiederschlagTrendV2Api extends DateModel, TrendModel {
    niederschlagGemessen: number;
}

export const mapToApiModel = ({
                                  date,
                                  niederschlagGemessen,
                                  trend,
                                  trendRating
                              }: WetterNiederschlagV2): WetterNiederschlagTrendV2Api => ({
    date,
    niederschlagGemessen,
    trend,
    trendRating
});
