import { TrendModel } from '../base/trend.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface SparzielZielSourceV4 {
    Datum: string;
    Kumulierte_Monatliche_Einsparung_GWh: string;
    Sparziel_GWh: string;
    Trend: string;
    TrendRating: string;
    Stand_Sparziel_gemessen_Prozent: string;
    Stand_Sparziel_geschaetzt_Prozent: string;
    Kumulierte_Monatliche_Einsparung_witterungsbereinigt_GWh: string;
    Stand_Sparziel_gemessen_witterungsbereinigt_Prozent: string;
}

export interface SparzielZielV4 extends BaseModel, DateModel, TrendModel {
    kumulierteMonatlicheEinsparungGWh: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
    kumulierteMonatlicheEinsparungWitterungsbereinigtGWh: number;
    standSparzielGemessenWitterungsbereinigtProzent: number;
}

export const map = (record: SparzielZielSourceV4): SparzielZielV4 => {
    return {
        id: getUuid(),
        date: record.Datum,
        kumulierteMonatlicheEinsparungGWh: parseInt(
            record.Kumulierte_Monatliche_Einsparung_GWh
        ),
        sparzielGWh: parseInt(record.Sparziel_GWh),
        standSparzielProzent: parseFloat(
            record.Stand_Sparziel_gemessen_Prozent
        ),
        standSparzielGeschaetztProzent: parseFloat(
            record.Stand_Sparziel_geschaetzt_Prozent
        ),
        kumulierteMonatlicheEinsparungWitterungsbereinigtGWh: parseInt(
            record.Kumulierte_Monatliche_Einsparung_witterungsbereinigt_GWh
        ),
        standSparzielGemessenWitterungsbereinigtProzent: parseFloat(
            record.Stand_Sparziel_gemessen_witterungsbereinigt_Prozent
        ),
        trend: Trend[record.Trend],
        trendRating: TrendRating[record.TrendRating]
    };
};
