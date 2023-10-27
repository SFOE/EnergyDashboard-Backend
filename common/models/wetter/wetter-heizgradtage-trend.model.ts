import { BaseModel } from '../base/base.model';
import { Trend, TrendRating } from '../base/trend.enum';
import {
    WetterHeizgradtageZeitreiheSource,
    WetterHeizgradtageZeitreihe
} from './wetter-heizgradtage-zeitreihe.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface WetterHeizgradtageTrendSource {
    Datum: string;
    Messung_Prognose_kumulativ_mean: string;
    Trend: string;
    TrendRating: string;
}

export interface WetterHeizgradtageTrend extends BaseModel, DateModel {
    messungPrognoseKumulativMittelwert: number;
    trend: Trend;
    rating: TrendRating;
}

export const map = (
    records: WetterHeizgradtageTrendSource[]
): WetterHeizgradtageTrend[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterHeizgradtageTrendSource
): WetterHeizgradtageTrend => {
    return {
        id: getUuid(),
        date: source.Datum,
        messungPrognoseKumulativMittelwert: parseFloat(
            source.Messung_Prognose_kumulativ_mean
        ),
        trend: Trend[source.Trend],
        rating: TrendRating[source.TrendRating]
    };
};
