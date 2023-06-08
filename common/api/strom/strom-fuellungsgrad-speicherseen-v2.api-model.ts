import { DateModel } from '/opt/nodejs/models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '/opt/nodejs/models/base/statistics.model';
import {
    StromFuellungsgradSpeicherseenRegionV2,
    StromFuellungsgradSpeicherseenV2
} from '/opt/nodejs/models/strom/strom-fuellungsgrad-speicherseen-v2.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export type FuellungsgradSpeicherseenRegionApiV2 = {
    [key in StromFuellungsgradSpeicherseenRegionV2]: FuellungsgradSpeicherseenPerRegionApiV2;
};

type FuellungsgradSpeicherseenPerRegionApiV2 = {
    currentEntry: {
        speicherstandProzent: number;
        speicherstandGWh: number;
        trend: Trend;
        trendRating: TrendRating;
        date: string;
    };
    entries: FuellungsgradSpeicherseenApiV2[];
};

export interface FuellungsgradSpeicherseenApiV2
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    speicherstandProzent: number;
    speicherstandGWh: number;
    speicherstandBei100ProzentInGWh: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
}

export const mapToApiModel = (
    records: StromFuellungsgradSpeicherseenV2[]
): FuellungsgradSpeicherseenRegionApiV2 => {
    return {
        [StromFuellungsgradSpeicherseenRegionV2.TotalCH]: mapRegion(StromFuellungsgradSpeicherseenRegionV2.TotalCH, records),
        [StromFuellungsgradSpeicherseenRegionV2.UebrigCH]: mapRegion(StromFuellungsgradSpeicherseenRegionV2.UebrigCH, records),
        [StromFuellungsgradSpeicherseenRegionV2.Graubuenden]: mapRegion(StromFuellungsgradSpeicherseenRegionV2.Graubuenden, records),
        [StromFuellungsgradSpeicherseenRegionV2.Wallis]: mapRegion(StromFuellungsgradSpeicherseenRegionV2.Wallis, records),
        [StromFuellungsgradSpeicherseenRegionV2.Tessin]: mapRegion(StromFuellungsgradSpeicherseenRegionV2.Tessin, records)
    };
};

const mapRegion = (
    region: StromFuellungsgradSpeicherseenRegionV2,
    allEntries: StromFuellungsgradSpeicherseenV2[]
): FuellungsgradSpeicherseenPerRegionApiV2 => {
    const regionEntries = filterEntries(region, allEntries).sort(dateSortFn);
    const currentEntry = regionEntries
        .slice()
        .reverse()
        .find((entry) => entry.speicherstandProzent !== null);
    const entries = regionEntries.map((entry) => mapToApi(entry));

    return {
        currentEntry: {
            speicherstandProzent: currentEntry.speicherstandProzent,
            speicherstandGWh: currentEntry.speicherstandGWh,
            trend: currentEntry.trend,
            trendRating: currentEntry.trendRating,
            date: currentEntry.date
        },
        entries: entries
    };
};

const filterEntries = (
    region: StromFuellungsgradSpeicherseenRegionV2,
    allEntries: StromFuellungsgradSpeicherseenV2[]
): StromFuellungsgradSpeicherseenV2[] => {
    return allEntries.filter((entry) => entry.region === region);
};

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
    differenzMax
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
    differenzMax
});
