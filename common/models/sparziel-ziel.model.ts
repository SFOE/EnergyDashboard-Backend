import { TrendModel } from './base/trend.model';
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

export interface SparzielZiel extends BaseModel, DateModel, TrendModel {
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
}

export const map = (
    meassuredRecord: SparzielZielSource,
    estimatedRecord?: SparzielZielSource
): SparzielZiel => {
    let recordToUse: SparzielZielSource;
    let geschaetztProzent: number = 0;
    if (!!estimatedRecord) {
        recordToUse = estimatedRecord;
        geschaetztProzent = calculateStandSparzielGeschaetztProzent(
            meassuredRecord,
            estimatedRecord
        );
    } else {
        recordToUse = meassuredRecord;
    }

    return {
        id: createId(recordToUse.Datum),
        date: recordToUse.Datum,
        kumulierteMonatlicheEinsparungGWh: parseInt(
            recordToUse.Kumulierte_Monatliche_Einsparung_GWh
        ),
        kumulierteEinsparungProzent: parseFloat(
            recordToUse.Kumulierte_Einsparung_Prozent
        ),
        sparzielGWh: parseInt(recordToUse.Sparziel_GWh),
        standSparzielProzent: parseFloat(
            meassuredRecord.Stand_Sparziel_Prozent
        ),
        standSparzielGeschaetztProzent: geschaetztProzent,
        trend: Trend[recordToUse.Trend],
        trendRating: TrendRating[recordToUse.TrendRating]
    };
};

const calculateStandSparzielGeschaetztProzent = (
    measuredRecord: SparzielZielSource,
    estimatedRecord: SparzielZielSource
): number => {
    const currentValue = parseFloat(estimatedRecord.Stand_Sparziel_Prozent);
    const previousValue = parseFloat(measuredRecord.Stand_Sparziel_Prozent);

    return parseFloat(Number(currentValue - previousValue).toFixed(1));
};

const createId = (date: string) => {
    return `sparziel-ziel-v2-${date}`;
};
