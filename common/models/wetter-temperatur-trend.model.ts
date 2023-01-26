import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface WetterTemperaturTrendSource {
    Trend: string;
    TrendRating: string;
}

export interface WetterTemperaturTrend {
    id: string;
    trend: Trend;
    trendRating: TrendRating;
}

export const map = (source: WetterTemperaturTrendSource): WetterTemperaturTrend => {
    return {
        id: createId(),
        trend: Trend[source.Trend],
        trendRating: TrendRating[source.TrendRating],
    };
}

export const createId = () => {
    return `wetter-temperatur-trend`;
}

