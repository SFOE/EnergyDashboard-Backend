import { expect, test } from '@jest/globals';
import { map, SparzielZiel, SparzielZielSource } from './sparziel-ziel.model';
import { Trend, TrendRating } from './trend.enum';

const mockRecord = <SparzielZielSource>{
    Datum: '2023-01-31',
    Kumulierte_Monatliche_Einsparung_GWh: '1000',
    Kumulierte_Einsparung_Prozent: '10',
    Sparziel_GWh: '10000',
    Stand_Sparziel_Prozent: '10',
    Trend: 'neutral',
    TrendRating: 'neutral'
};

test('should map correctly with previous record', () => {
    const previousRecord = mockRecord;
    const currentRecord = <SparzielZielSource>{
        Datum: '2023-02-28',
        Kumulierte_Monatliche_Einsparung_GWh: '2000',
        Kumulierte_Einsparung_Prozent: '10',
        Sparziel_GWh: '10000',
        Stand_Sparziel_Prozent: '20',
        Trend: 'neutral',
        TrendRating: 'neutral'
    };

    const expected = <SparzielZiel>{
        id: 'sparziel-ziel-v2-2023-02-28',
        date: '2023-02-28',
        kumulierteMonatlicheEinsparungGWh: 2000,
        kumulierteEinsparungProzent: 10,
        sparzielGWh: 10000,
        standSparzielProzent: 10,
        standSparzielGeschaetztProzent: 10,
        trend: Trend.neutral,
        trendRating: TrendRating.neutral
    };

    const result = map(previousRecord, currentRecord);
    expect(result).toEqual(expected);
});

test('should map correctly without previous record', () => {
    const previousRecord = mockRecord;
    const currentRecord = undefined;

    const expected = <SparzielZiel>{
        id: 'sparziel-ziel-v2-2023-01-31',
        date: '2023-01-31',
        kumulierteMonatlicheEinsparungGWh: 1000,
        kumulierteEinsparungProzent: 10,
        sparzielGWh: 10000,
        standSparzielProzent: 10,
        standSparzielGeschaetztProzent: 0,
        trend: Trend.neutral,
        trendRating: TrendRating.neutral
    };

    const result = map(previousRecord, currentRecord);
    expect(result).toEqual(expected);
});
