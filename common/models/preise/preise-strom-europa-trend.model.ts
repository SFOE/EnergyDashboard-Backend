import { getUuid } from '../../utils/id.utils';
import { BaseModel } from '../base/base.model';
import { DateModel } from '../base/date.model';
import { Trend, TrendRating } from '../base/trend.enum';

export interface PreiseStromEuropaTrendSource {
    Datum: string;
    EU: string;
    Trend: string;
    TrendRating: string;
}

export interface PreiseStromEuropaTrend extends BaseModel, DateModel {
    value: number;
    trend: Trend;
    rating: TrendRating;
}

export const map = (
    records: PreiseStromEuropaTrendSource[]
): PreiseStromEuropaTrend[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseStromEuropaTrendSource
): PreiseStromEuropaTrend => {
    return {
        id: getUuid(),
        date: new Date(record.Datum).toISOString(),
        value: parseFloat(record.EU),
        trend: Trend[record.Trend],
        rating: TrendRating[record.TrendRating]
    };
};
