import { DateModel } from '../models/base/date.model';
import { DiffStatisticsModel } from '../models/base/statistics.model';
import { mapDateMonthAndDay } from '../utils/date.utils';
import {
    FuellstandGasspeicher,
    FuellstandGasspeicherRegion
} from '/opt/nodejs/models/fuellstand-gasspeicher.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export type FuellstandGasspeicherRegionApi = {
    currentEntry: FuellstandGasspeicherRegionCurrentEntryApi;
    entries: FuellstandGasspeicherRegionEntriesApi;
};

export type FuellstandGasspeicherRegionCurrentEntryApi = {
    [key in FuellstandGasspeicherRegion]: FuellstandGasspeicherRegionCurrentEntryPerRegionApi;
};

type FuellstandGasspeicherRegionCurrentEntryPerRegionApi = {
    speicherstandProzent: number | null;
    speicherstandTwh: number | null;
    date: string;
    trend: Trend;
    trendRating: TrendRating;
};

type FuellstandGasspeicherRegionEntriesApi = {
    [key in FuellstandGasspeicherRegion]: FuellstandGasspeicherApi[];
};

export interface FuellstandGasspeicherApi
    extends DateModel,
        DiffStatisticsModel {
    speicherstandProzent: number | null;
    min: number;
    max: number;
    mittel: number;
}

export const mapToApiModel = (
    records: FuellstandGasspeicher[]
): FuellstandGasspeicherRegionApi => {
    return {
        currentEntry: mapCurrentEntry(records),
        entries: mapEntries(records)
    };
};

const mapCurrentEntry = (
    records: FuellstandGasspeicher[]
): FuellstandGasspeicherRegionCurrentEntryApi => {
    return {
        [FuellstandGasspeicherRegion.Austria]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegion.Austria,
            records
        ),
        [FuellstandGasspeicherRegion.Germany]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegion.Germany,
            records
        ),
        [FuellstandGasspeicherRegion.France]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegion.France,
            records
        ),
        [FuellstandGasspeicherRegion.Italy]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegion.Italy,
            records
        ),
        [FuellstandGasspeicherRegion.EU]: mapRegionCurrentEntry(
            FuellstandGasspeicherRegion.EU,
            records
        )
    };
};

const mapRegionCurrentEntry = (
    region: FuellstandGasspeicherRegion,
    allEntries: FuellstandGasspeicher[]
): FuellstandGasspeicherRegionCurrentEntryPerRegionApi => {
    const regionEntries = filterEntries(region, allEntries).sort(regionSortFn);
    const currentEntry = regionEntries
        .slice()
        .reverse()
        .find((entry) => entry.speicherstandProzent !== null);

    return {
        speicherstandProzent: currentEntry.speicherstandProzent,
        speicherstandTwh: currentEntry.speicherstandTWh,
        date: mapDateMonthAndDay(currentEntry.monat, currentEntry.tag),
        trend: currentEntry.trend,
        trendRating: currentEntry.trendRating
    };
};

const mapEntries = (
    records: FuellstandGasspeicher[]
): FuellstandGasspeicherRegionEntriesApi => {
    return {
        [FuellstandGasspeicherRegion.Austria]: mapRegionEntries(
            FuellstandGasspeicherRegion.Austria,
            records
        ),
        [FuellstandGasspeicherRegion.Germany]: mapRegionEntries(
            FuellstandGasspeicherRegion.Germany,
            records
        ),
        [FuellstandGasspeicherRegion.France]: mapRegionEntries(
            FuellstandGasspeicherRegion.France,
            records
        ),
        [FuellstandGasspeicherRegion.Italy]: mapRegionEntries(
            FuellstandGasspeicherRegion.Italy,
            records
        ),
        [FuellstandGasspeicherRegion.EU]: mapRegionEntries(
            FuellstandGasspeicherRegion.EU,
            records
        )
    };
};

const mapRegionEntries = (
    region: FuellstandGasspeicherRegion,
    allEntries: FuellstandGasspeicher[]
): FuellstandGasspeicherApi[] => {
    const regionEntries = filterEntries(region, allEntries).sort(regionSortFn);
    return regionEntries.map((entry) => mapToApi(entry));
};

const mapToApi = ({
    speicherstandProzent,
    min,
    max,
    mittel,
    monat,
    tag,
    differenzMittelwert,
    differenzMin,
    differenzMax
}: FuellstandGasspeicher): FuellstandGasspeicherApi => {
    return {
        speicherstandProzent,
        min,
        max,
        mittel,
        date: mapDateMonthAndDay(monat, tag),
        differenzMittelwert,
        differenzMin,
        differenzMax
    };
};

const filterEntries = (
    region: FuellstandGasspeicherRegion,
    allEntries: FuellstandGasspeicher[]
): FuellstandGasspeicher[] => {
    return allEntries.filter((entry) => entry.region === region);
};

const regionSortFn = (a, b) => a.monat - b.monat || a.tag - b.tag;
