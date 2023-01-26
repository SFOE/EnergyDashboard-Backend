import { StromProduktionImportVerbrauch } from '/opt/nodejs/models/strom-produktion-import-verbrauch.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface StromProduktionImportVerbrauchApi {
    currentEntry: StromProduktionImportVerbrauchCurrentEntryApi,
    entries: StromProduktionImportVerbrauchEntryApi[]
}

interface StromProduktionImportVerbrauchCurrentEntryApi {
    datum: Date,
    eigenproduktion: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromProduktionImportVerbrauchEntryApi {
    datum: Date;
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

export const mapToApiModel = (entries: StromProduktionImportVerbrauch[]): StromProduktionImportVerbrauchApi => {
    const currentEntry = getCurrentEntry(entries);
    const mappedCurrentEntry = mapCurrentEntry(currentEntry);
    const mappedEntries = entries.map(entry => mapEntry(entry))

    return {
        currentEntry: mappedCurrentEntry,
        entries: mappedEntries,
    }
}

const getCurrentEntry = (records: StromProduktionImportVerbrauch[]) => {
    return records.sort(sortFn)
        .slice()
        .reverse()
        .find(entry => entry.stromverbrauch !== null);
}

const sortFn = (a: StromProduktionImportVerbrauch, b: StromProduktionImportVerbrauch) => new Date(a.datum).getTime() - new Date(b.datum).getTime();

const mapCurrentEntry = (entry: StromProduktionImportVerbrauch): StromProduktionImportVerbrauchCurrentEntryApi => ({
    datum: new Date(entry.datum),
    eigenproduktion: entry.eigenproduktion,
    trend: entry.trend,
    trendRating: entry.trendRating,
});

const mapEntry = (entry: StromProduktionImportVerbrauch): StromProduktionImportVerbrauchEntryApi => ({
    datum: new Date(entry.datum),
    stromverbrauch: entry.stromverbrauch,
    kernkraft: entry.kernkraft,
    thermische: entry.thermische,
    flusskraft: entry.flusskraft,
    speicherkraft: entry.speicherkraft,
    wind: entry.wind,
    photovoltaik: entry.photovoltaik,
    eigenproduktion: entry.eigenproduktion,
    nettoimporte: entry.nettoimporte,
});
