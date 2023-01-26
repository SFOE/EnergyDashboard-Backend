import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface GasSparzielZielSource {
    Stand_Monat: string;
    Stand_Jahr: string;
    Kumulierte_Monatliche_Einsparung_GWh: string;
    Kumulierte_Einsparung_Prozent: string;
    Sparziel_GWh: string;
    Stand_Sparziel_Prozent: string;
    Trend: string;
    TrendRating: string;
}

export interface GasSparzielZiel {
    id: string;
    standMonat: number;
    standJahr: number;
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const map = (record: GasSparzielZielSource): GasSparzielZiel => ({
    id: `${record.Stand_Monat}-${record.Stand_Jahr}`,
    standMonat: parseInt(record.Stand_Monat),
    standJahr: parseInt(record.Stand_Jahr),
    kumulierteMonatlicheEinsparungGWh: parseInt(record.Kumulierte_Monatliche_Einsparung_GWh),
    kumulierteEinsparungProzent: parseInt(record.Kumulierte_Einsparung_Prozent),
    sparzielGWh: parseInt(record.Sparziel_GWh),
    standSparzielProzent: parseInt(record.Stand_Sparziel_Prozent),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
})
