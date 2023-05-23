import { DateModel } from '../models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '../models/base/statistics.model';
import {
    FuellstandGasspeicherRegionV2,
    FuellstandGasspeicherV2
} from '/opt/nodejs/models/gas-fuellstand-gasspeicher-v2.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export type FuellstandGasspeicherRegionApiV2 = {
    currentEntry: FuellstandGasspeicherRegionCurrentEntryApiV2;
    entries: FuellstandGasspeicherRegionEntriesApiV2;
};

export type FuellstandGasspeicherRegionCurrentEntryApiV2 = {
    [key in FuellstandGasspeicherRegionV2]: FuellstandGasspeicherRegionCurrentEntryPerRegionApiV2;
};

type FuellstandGasspeicherRegionCurrentEntryPerRegionApiV2 = {
    speicherstandProzent: number | null;
    speicherstandTwh: number | null;
    date: string;
    trend: Trend;
    trendRating: TrendRating;
};

type FuellstandGasspeicherRegionEntriesApiV2 = {
    [key in FuellstandGasspeicherRegionV2]: FuellstandGasspeicherApiV2[];
};

export interface FuellstandGasspeicherApiV2
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    speicherstandProzent: number | null;
    speicherstandTWh: number | null;
}

export const mapToApiModel = (
    records: FuellstandGasspeicherV2[]
): FuellstandGasspeicherRegionApiV2 => {
    return {
        currentEntry: mapCurrentEntry(records),
        entries: mapEntries(records)
    };
};

const mapCurrentEntry = (
    records: FuellstandGasspeicherV2[]
): FuellstandGasspeicherRegionCurrentEntryApiV2 => {
    return {
        [FuellstandGasspeicherRegionV2.Austria]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegionV2.Austria,
            records
        ),
        [FuellstandGasspeicherRegionV2.Germany]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegionV2.Germany,
            records
        ),
        [FuellstandGasspeicherRegionV2.France]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegionV2.France,
            records
        ),
        [FuellstandGasspeicherRegionV2.Italy]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegionV2.Italy,
            records
        ),
        [FuellstandGasspeicherRegionV2.EU]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegionV2.EU,
            records
        )
    };
};

const mapRegionCurrentEntry = (
    region: FuellstandGasspeicherRegionV2,
    allEntries: FuellstandGasspeicherV2[]
): FuellstandGasspeicherRegionCurrentEntryPerRegionApiV2 => {
    const regionEntries = filterEntries(region, allEntries).sort(dateSortFn);
    const currentEntry = regionEntries
        .slice()
        .reverse()
        .find((entry) => entry.speicherstandProzent !== null);

    return {
        speicherstandProzent: currentEntry.speicherstandProzent,
        speicherstandTwh: currentEntry.speicherstandTWh,
        date: currentEntry.date,
        trend: currentEntry.trend,
        trendRating: currentEntry.trendRating
    };
};

const mapEntries = (
    records: FuellstandGasspeicherV2[]
): FuellstandGasspeicherRegionEntriesApiV2 => {
    return {
        [FuellstandGasspeicherRegionV2.Austria]: mapRegionEntries(
            FuellstandGasspeicherRegionV2.Austria,
            records
        ),
        [FuellstandGasspeicherRegionV2.Germany]: mapRegionEntries(
            FuellstandGasspeicherRegionV2.Germany,
            records
        ),
        [FuellstandGasspeicherRegionV2.France]: mapRegionEntries(
            FuellstandGasspeicherRegionV2.France,
            records
        ),
        [FuellstandGasspeicherRegionV2.Italy]: mapRegionEntries(
            FuellstandGasspeicherRegionV2.Italy,
            records
        ),
        [FuellstandGasspeicherRegionV2.EU]: mapRegionEntries(
            FuellstandGasspeicherRegionV2.EU,
            records
        )
    };
};

const mapRegionEntries = (
    region: FuellstandGasspeicherRegionV2,
    allEntries: FuellstandGasspeicherV2[]
): FuellstandGasspeicherApiV2[] => {
    const regionEntries = filterEntries(region, allEntries).sort(dateSortFn);
    return regionEntries.map((entry) => mapToApi(entry));
};

const mapToApi = ({
    speicherstandProzent,
    speicherstandTWh,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    date,
    differenzMittelwert,
    differenzMin,
    differenzMax
}: FuellstandGasspeicherV2): FuellstandGasspeicherApiV2 => {
    return {
        speicherstandProzent,
        speicherstandTWh,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date,
        differenzMittelwert,
        differenzMin,
        differenzMax
    };
};

const filterEntries = (
    region: FuellstandGasspeicherRegionV2,
    allEntries: FuellstandGasspeicherV2[]
): FuellstandGasspeicherV2[] => {
    return allEntries.filter((entry) => entry.region === region);
};
