import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';

export interface DashboardEntryApi {
    value: number;
    trend: Trend;
    trendRating: TrendRating;
    date: string;
}

export interface DashboardEntryWithoutDateApi {
    value: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface DashboardEntryWithoutTrendApi {
    value: number;
    date: string;
}

export interface DashboardTrendEntryApi {
    trend: Trend;
    trendRating: TrendRating;
}
