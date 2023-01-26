import { expect, test } from '@jest/globals';
import {
    FuellstandGasspeicher,
    FuellstandGasspeicherRegion,
    FuellstandGasspeicherSource,
    map,
} from './fuellstand-gasspeicher.model';
import { Trend, TrendRating } from './trend.enum';

const source: FuellstandGasspeicherSource[] = [{
    Speicherstand_prozent: '34.84',
    min: '55.83',
    max: '96.93',
    mittel: '67.60181818182',
    Monat: '1',
    Tag: '1',
    Speicherregion: 'Austria',
    Differenz_Mittelwert: '-32.8',
    Differenz_min: '-21',
    Differenz_max: '-62.1',
    MA_Trend: 'NA',
    Trend: 'NA',
    TrendRating: 'NA',
    Speicherstand_TWh: '10'
}, {
    Speicherstand_prozent: '32.16',
    min: '49.83',
    max: '93.44',
    mittel: '63.51',
    Monat: '1',
    Tag: '11',
    Speicherregion: 'Austria',
    Differenz_Mittelwert: '-31.4',
    Differenz_min: '-17.7',
    Differenz_max: '-61.3',
    MA_Trend: '-0.8',
    Trend: 'down_mild',
    TrendRating: 'negativ',
    Speicherstand_TWh: '2'
}];

const target: FuellstandGasspeicher[] = [
    {
        id: 'Austria-1-1',
        speicherstandProzent: 34.84,
        min: 55.83,
        max: 96.93,
        mittel: 67.60181818182,
        monat: 1,
        tag: 1,
        region: FuellstandGasspeicherRegion.Austria,
        differenzMittelwert: -32.8,
        differenzMin: -21,
        differenzMax: -62.1,
        trendMovingAverage: null,
        trend: null,
        trendRating: null,
        speicherstandTWh: 10
    },
    {
        id: 'Austria-1-11',
        speicherstandProzent: 32.16,
        min: 49.83,
        max: 93.44,
        mittel: 63.51,
        monat: 1,
        tag: 11,
        region: FuellstandGasspeicherRegion.Austria,
        differenzMittelwert: -31.4,
        differenzMin: -17.7,
        differenzMax: -61.3,
        trendMovingAverage: -0.8,
        trend: Trend.down_mild,
        trendRating: TrendRating.negativ,
        speicherstandTWh: 2
    },
]

test('correct mapping is performed', () => {
    const expected = map(source);
    expect(expected).toEqual(target);
});
