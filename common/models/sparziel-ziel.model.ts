import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface SparzielZielSource {
    Datum: string;
    Kumulierte_Monatliche_Einsparung_GWh: string;
    Kumulierte_Einsparung_Prozent: string;
    Sparziel_GWh: string;
    Stand_Sparziel_Prozent: string;
    Trend: string;
    TrendRating: string;
}

export interface SparzielZiel extends BaseModel, DateModel {
    id: string;
    date: string;
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const map = (previousRecord: SparzielZielSource, currentRecord: SparzielZielSource): SparzielZiel => ({
    id: createId(currentRecord.Datum),
    date: currentRecord.Datum,
    kumulierteMonatlicheEinsparungGWh: parseInt(currentRecord.Kumulierte_Monatliche_Einsparung_GWh),
    kumulierteEinsparungProzent: parseFloat(currentRecord.Kumulierte_Einsparung_Prozent),
    sparzielGWh: parseInt(currentRecord.Sparziel_GWh),
    standSparzielProzent: parseFloat(previousRecord.Stand_Sparziel_Prozent),
    standSparzielGeschaetztProzent: calculateStandSparzielGeschaetztProzent(previousRecord, currentRecord),
    trend: Trend[currentRecord.Trend],
    trendRating: TrendRating[currentRecord.TrendRating],
})

const calculateStandSparzielGeschaetztProzent = (previousRecord: SparzielZielSource, currentRecord: SparzielZielSource): number => {
    const currentValue = parseFloat(currentRecord.Stand_Sparziel_Prozent);
    const previousValue = parseFloat(previousRecord.Stand_Sparziel_Prozent);

    return parseFloat(Number(currentValue - previousValue).toFixed(1));
}

const createId = (date: string) => {
    return `sparziel-ziel-v2-${date}`;
}
