import { Region } from '/opt/nodejs/models/fuellungsgrad-speicherseen.model';
import { StromFuellungsgradSpeicherseenV2 } from '/opt/nodejs/models/strom-fuellungsgrad-speicherseen-v2.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export type FuellungsgradSpeicherseenRegionApiV2 = {
    [key in Region]: FuellungsgradSpeicherseenPerRegionApiV2
};

type FuellungsgradSpeicherseenPerRegionApiV2 = {
    currentEntry: {
        speicherstandProzent: number,
        speicherstandGWh: number,
        trend: Trend,
        trendRating: TrendRating,
        date: string
    }
    entries: FuellungsgradSpeicherseenApiV2[]
}

export interface FuellungsgradSpeicherseenApiV2 {
    date: string;
    speicherstandProzent: number;
    speicherstandGWh: number;
    speicherstandBei100ProzentInGWh: number;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
    differenzMittelwert: number;
    differenzMin: number;
    differenzMax: number;
}

export const mapToApiModel = (records: StromFuellungsgradSpeicherseenV2[]): FuellungsgradSpeicherseenRegionApiV2 => {
    return {
        [Region.TotalCH]: mapRegion(Region.TotalCH, records),
        [Region.UebrigCH]: mapRegion(Region.UebrigCH, records),
        [Region.Graubuenden]: mapRegion(Region.Graubuenden, records),
        [Region.Wallis]: mapRegion(Region.Wallis, records),
        [Region.Tessin]: mapRegion(Region.Tessin, records),
    };
}

const mapRegion = (region: Region, allEntries: StromFuellungsgradSpeicherseenV2[]): FuellungsgradSpeicherseenPerRegionApiV2 => {
    const regionEntries = filterEntries(region, allEntries).sort(dateSortFn);
    const currentEntry = regionEntries.slice().reverse().find(entry => entry.speicherstandProzent !== null);
    const entries = regionEntries.map(entry => mapToApi(entry));

    return {
        currentEntry: {
            speicherstandProzent: currentEntry.speicherstandProzent,
            speicherstandGWh: currentEntry.speicherstandGWh,
            trend: currentEntry.trend,
            trendRating: currentEntry.trendRating,
            date: currentEntry.date,
        },
        entries: entries,
    }
}

const filterEntries = (region: Region, allEntries: StromFuellungsgradSpeicherseenV2[]): StromFuellungsgradSpeicherseenV2[] => {
    return allEntries.filter(entry => entry.region === region);
}

const mapToApi = ({
    date,
    speicherstandProzent,
    speicherstandGWh,
    speicherstandBei100ProzentInGWh,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    historicalMin,
    historicalMinWithReserves,
    differenzMittelwert,
    differenzMin,
    differenzMax,
}: StromFuellungsgradSpeicherseenV2): FuellungsgradSpeicherseenApiV2 => ({
    date,
    speicherstandProzent,
    speicherstandGWh,
    speicherstandBei100ProzentInGWh,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    historicalMin,
    historicalMinWithReserves,
    differenzMittelwert,
    differenzMin,
    differenzMax,
})
