import { TrendModel } from '../base/trend.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { parseFloatOrNullForNA, roundOneDecimal } from '/opt/nodejs/utils/number.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface WetterTemperaturTrendSourceV2 {
    Trend: string;
    TrendRating: string;
    Temp5days: string;
}

export interface WetterTemperaturTrendV2 extends BaseModel, TrendModel {
    averageTemperature: number;
}

export const map = (
    source: WetterTemperaturTrendSourceV2
): WetterTemperaturTrendV2 => {
    return {
        id: getUuid(),
        trend: Trend[source.Trend],
        trendRating: TrendRating[source.TrendRating],
        averageTemperature: roundOneDecimal(
            parseFloatOrNullForNA(source.Temp5days)
        )
    };
};
