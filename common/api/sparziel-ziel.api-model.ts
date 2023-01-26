import { SparzielZiel } from '/opt/nodejs/models/sparziel-ziel.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface SparzielZielApi {
    date: string;
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const mapToApiModel = (record: SparzielZiel): SparzielZielApi => ({
    date: record.date,
    kumulierteMonatlicheEinsparungGWh: record.kumulierteMonatlicheEinsparungGWh,
    kumulierteEinsparungProzent: record.kumulierteEinsparungProzent,
    sparzielGWh: record.sparzielGWh,
    standSparzielProzent: record.standSparzielProzent,
    standSparzielGeschaetztProzent: record.standSparzielGeschaetztProzent,
    trend: record.trend,
    trendRating: record.trendRating,
})
