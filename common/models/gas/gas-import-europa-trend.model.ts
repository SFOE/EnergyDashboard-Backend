import { getUuid } from '../../utils/id.utils';
import { BaseModel } from '../base/base.model';
import { DateModel } from '../base/date.model';
import { Trend, TrendRating } from '../base/trend.enum';

export interface GasImportEuropaTrendSource {
    datum: string;
    EU_mill_m3: string;
    Trend: string;
    TrendRating: string;
}

export interface GasImportEuropaTrend extends BaseModel, DateModel {
    value: number;
    trend: Trend;
    rating: TrendRating;
}

export const map = (
    records: GasImportEuropaTrendSource[]
): GasImportEuropaTrend[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: GasImportEuropaTrendSource
): GasImportEuropaTrend => {
    return {
        id: getUuid(),
        date: new Date(record.datum).toISOString(),
        value: parseFloat(record.EU_mill_m3),
        trend: Trend[record.Trend],
        rating: TrendRating[record.TrendRating]
    };
};
