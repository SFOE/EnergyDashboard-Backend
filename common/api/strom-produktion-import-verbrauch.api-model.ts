import { DateModel } from '../models/base/date.model';
import { dateSortFn } from '../utils/sort.utils';
import { StromProduktionImportVerbrauch } from '/opt/nodejs/models/strom-produktion-import-verbrauch.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface StromProduktionImportVerbrauchApi {
    currentEntry: StromProduktionImportVerbrauchCurrentEntryApi;
    entries: StromProduktionImportVerbrauchEntryApi[];
}

interface StromProduktionImportVerbrauchCurrentEntryApi extends DateModel {
    eigenproduktion: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromProduktionImportVerbrauchEntryApi extends DateModel {
    stromverbrauch: number;
    kernkraft: number;
    thermische: number;
    flusskraft: number;
    speicherkraft: number;
    wind: number | null;
    photovoltaik: number | null;
    eigenproduktion: number;
    nettoimporte: number;
}

export const mapToApiModel = (
    entries: StromProduktionImportVerbrauch[]
): StromProduktionImportVerbrauchApi => {
    const currentEntry = getCurrentEntry(entries);
    const mappedCurrentEntry = mapCurrentEntry(currentEntry);
    const mappedEntries = entries.map((entry) => mapEntry(entry));

    return {
        currentEntry: mappedCurrentEntry,
        entries: mappedEntries
    };
};

const getCurrentEntry = (records: StromProduktionImportVerbrauch[]) => {
    return records
        .sort(dateSortFn)
        .slice()
        .reverse()
        .find((entry) => entry.stromverbrauch !== null);
};

const mapCurrentEntry = (
    entry: StromProduktionImportVerbrauch
): StromProduktionImportVerbrauchCurrentEntryApi => ({
    date: entry.date,
    eigenproduktion: entry.eigenproduktion,
    trend: entry.trend,
    trendRating: entry.trendRating
});

const mapEntry = (
    entry: StromProduktionImportVerbrauch
): StromProduktionImportVerbrauchEntryApi => ({
    date: entry.date,
    stromverbrauch: entry.stromverbrauch,
    kernkraft: entry.kernkraft,
    thermische: entry.thermische,
    flusskraft: entry.flusskraft,
    speicherkraft: entry.speicherkraft,
    wind: entry.wind,
    photovoltaik: entry.photovoltaik,
    eigenproduktion: entry.eigenproduktion,
    nettoimporte: entry.nettoimporte
});
