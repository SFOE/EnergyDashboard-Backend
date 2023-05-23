import { FiveYearWithDiffStatisticsModel } from '../models/base/statistics.model';
import {
    FuellungsgradSpeicherseen,
    Region
} from '/opt/nodejs/models/fuellungsgrad-speicherseen.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { convertWeekNumberToDate } from '/opt/nodejs/utils/date.utils';

export type FuellungsgradSpeicherseenRegionApi = {
    [key in Region]: FuellungsgradSpeicherseenPerRegionApi;
};

type FuellungsgradSpeicherseenPerRegionApi = {
    currentEntry: {
        speicherstandProzent: number;
        trend: Trend;
        trendRating: TrendRating;
        date: string;
    };
    entries: FuellungsgradSpeicherseenApi[];
};

export interface FuellungsgradSpeicherseenApi
    extends FiveYearWithDiffStatisticsModel {
    kalenderwoche: number;
    speicherstandProzent: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
}

export const mapToApiModel = (
    records: FuellungsgradSpeicherseen[]
): FuellungsgradSpeicherseenRegionApi => {
    return {
        [Region.TotalCH]: mapRegion(Region.TotalCH, records),
        [Region.UebrigCH]: mapRegion(Region.UebrigCH, records),
        [Region.Graubuenden]: mapRegion(Region.Graubuenden, records),
        [Region.Wallis]: mapRegion(Region.Wallis, records),
        [Region.Tessin]: mapRegion(Region.Tessin, records)
    };
};

const mapRegion = (
    region: Region,
    allEntries: FuellungsgradSpeicherseen[]
): FuellungsgradSpeicherseenPerRegionApi => {
    const regionEntries = filterEntries(region, allEntries).sort(regionSortFn);
    const currentEntry = regionEntries
        .slice()
        .reverse()
        .find((entry) => entry.speicherstandProzent !== null);
    const entries = regionEntries.map((entry) => mapToApi(entry));

    return {
        currentEntry: {
            speicherstandProzent: currentEntry.speicherstandProzent,
            trend: currentEntry.trend,
            trendRating: currentEntry.trendRating,
            date: convertWeekNumberToDate(currentEntry.kalenderwoche)
        },
        entries: entries
    };
};

const filterEntries = (
    region: Region,
    allEntries: FuellungsgradSpeicherseen[]
): FuellungsgradSpeicherseen[] => {
    return allEntries.filter((entry) => entry.region === region);
};

const regionSortFn = (a, b) => a.kalenderwoche - b.kalenderwoche;

const mapToApi = ({
    kalenderwoche,
    speicherstandProzent,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    historicalMin,
    historicalMinWithReserves,
    differenzMittelwert,
    differenzMin,
    differenzMax
}: FuellungsgradSpeicherseen): FuellungsgradSpeicherseenApi => ({
    kalenderwoche,
    speicherstandProzent,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    historicalMin,
    historicalMinWithReserves,
    differenzMittelwert,
    differenzMin,
    differenzMax
});
