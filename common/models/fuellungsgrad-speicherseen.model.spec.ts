import { expect, test } from '@jest/globals';
import {
    FuellungsgradSpeicherseen,
    FuellungsgradSpeicherseenSource,
    map,
    Region,
} from './fuellungsgrad-speicherseen.model';
import { Trend, TrendRating } from './trend.enum';

const source: FuellungsgradSpeicherseenSource[] = [{
    Region: 'Tessin',
    Kalenderwoche: '2',
    Speicherstand_prozent: '10',
    "5y_Min": '5',
    "5y_Max": '20',
    "5y_Mittelwert": '12',
    Differenz_Mittelwert: '8',
    Differenz_min: '5',
    Differenz_max: '7',
    hist_min_und_Speicherreserve: 'NA',
    hist_min: 'NA',
    PP_Trend: '12',
    Trend: 'up_mild',
    TrendRating: 'neutral'
}, {
    Region: 'Tessin',
    Kalenderwoche: '1',
    Speicherstand_prozent: '10',
    "5y_Min": '5',
    "5y_Max": '20',
    "5y_Mittelwert": '12',
    Differenz_Mittelwert: '8',
    Differenz_min: '5',
    Differenz_max: '7',
    hist_min_und_Speicherreserve: 'NA',
    hist_min: 'NA',
    PP_Trend: '12',
    Trend: 'up_mild',
    TrendRating: 'neutral'
}, {
    Region: 'Graubuenden',
    Kalenderwoche: '1',
    Speicherstand_prozent: '10',
    "5y_Min": '5',
    "5y_Max": '20',
    "5y_Mittelwert": '12',
    Differenz_Mittelwert: '8',
    Differenz_min: '5',
    Differenz_max: '7',
    hist_min_und_Speicherreserve: 'NA',
    hist_min: 'NA',
    PP_Trend: '12',
    Trend: 'up_mild',
    TrendRating: 'neutral'
}];

const target: FuellungsgradSpeicherseen[] = [
    {
        region: Region.Tessin,
        kalenderwoche: 2,
        speicherstandProzent: 10,
        fiveYearMin: 5,
        fiveYearMax: 20,
        fiveYearMittelwert: 12,
        differenzMittelwert: 8,
        differenzMin: 5,
        differenzMax: 7,
        historicalMinWithReserves: null,
        historicalMin: null,
        trendMovingAverage: 12,
        trend: Trend.up_mild,
        trendRating: TrendRating.neutral
    },
    {
        region: Region.Tessin,
        kalenderwoche: 1,
        speicherstandProzent: 10,
        fiveYearMin: 5,
        fiveYearMax: 20,
        fiveYearMittelwert: 12,
        differenzMittelwert: 8,
        differenzMin: 5,
        differenzMax: 7,
        historicalMinWithReserves: null,
        historicalMin: null,
        trendMovingAverage: 12,
        trend: Trend.up_mild,
        trendRating: TrendRating.neutral
    }, {
        region: Region.Graubuenden,
        kalenderwoche: 1,
        speicherstandProzent: 10,
        fiveYearMin: 5,
        fiveYearMax: 20,
        fiveYearMittelwert: 12,
        differenzMittelwert: 8,
        differenzMin: 5,
        differenzMax: 7,
        historicalMinWithReserves: null,
        historicalMin: null,
        trendMovingAverage: 12,
        trend: Trend.up_mild,
        trendRating: TrendRating.neutral
    },
]

test('correct mapping is performed', () => {
    const expected = map(source);
    expect(expected).toEqual(target);
});
