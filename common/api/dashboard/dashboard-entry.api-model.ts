import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface DashboardEntryApi {
    value: number;
    trend: Trend;
    trendRating: TrendRating;
    date: string;
}

export interface DashboardEntryWithoutTrendApi {
    value: number;
    date: string;
}

export interface DashboardTrendEntryApi {
    trend: Trend;
    trendRating: TrendRating;
}
