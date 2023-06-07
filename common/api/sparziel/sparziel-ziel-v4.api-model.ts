import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { SparzielZielV4 } from '/opt/nodejs/models/sparziel/sparziel-ziel-v4.model';

export interface SparzielZielApiV4 {
    date: string;
    kumulierteMonatlicheEinsparungGWh: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
    kumulierteMonatlicheEinsparungWitterungsbereinigtGWh: number;
    standSparzielGemessenWitterungsbereinigtProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const mapToApiModel = (record: SparzielZielV4): SparzielZielApiV4 => ({
    date: record.date,
    kumulierteMonatlicheEinsparungGWh: record.kumulierteMonatlicheEinsparungGWh,
    sparzielGWh: record.sparzielGWh,
    standSparzielProzent: record.standSparzielProzent,
    standSparzielGeschaetztProzent: record.standSparzielGeschaetztProzent,
    kumulierteMonatlicheEinsparungWitterungsbereinigtGWh: record.kumulierteMonatlicheEinsparungWitterungsbereinigtGWh,
    standSparzielGemessenWitterungsbereinigtProzent: record.standSparzielGemessenWitterungsbereinigtProzent,
    trend: record.trend,
    trendRating: record.trendRating
});
