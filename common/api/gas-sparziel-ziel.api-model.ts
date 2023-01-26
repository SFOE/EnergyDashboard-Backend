import { GasSparzielZiel } from '/opt/nodejs/models/gas-sparziel-ziel.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { mapDateYearAndMonth } from '/opt/nodejs/utils/date.utils';

export interface GasSparzielZielApi {
    date: string;
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const mapToApiModel = (record: GasSparzielZiel): GasSparzielZielApi => ({
    date: mapDateYearAndMonth(record.standJahr, record.standMonat),
    kumulierteMonatlicheEinsparungGWh: record.kumulierteMonatlicheEinsparungGWh,
    kumulierteEinsparungProzent: record.kumulierteEinsparungProzent,
    sparzielGWh: record.sparzielGWh,
    standSparzielProzent: record.standSparzielProzent,
    trend: record.trend,
    trendRating: record.trendRating,
})
