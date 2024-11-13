import { groupBy } from '../../utils/array.utils';
import { DateModel } from '/opt/nodejs/models/base/date.model';

import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import {
    Perspektive,
    StromEnergieverbrauchEndenergieverbrauch
} from '/opt/nodejs/models/strom/strom-energieverbrauch-endenergieverbrauch';

export type StromEnergieverbrauchEndenergieverbrauchApi = {
    [perspektive in Exclude<
        Perspektive,
        'Statistik'
    >]: StromEnergieverbrauchEndenergieverbrauchEntryApi[];
};

export interface StromEnergieverbrauchEndenergieverbrauchEntryApi
    extends DateModel {
    elektrizitaet: number | null;
    erdoelprodukte: number | null;
    fernwaerme: number | null;
    erdgas: number | null;
    holz: number | null;
    kohle: number | null;
    abfaelle: number | null;
    uebrigeErneuerbareEnergien: number | null;
    ptx: number | null;
    perspektive: Perspektive;
}

export const mapToApiModel = (
    entries: StromEnergieverbrauchEndenergieverbrauch[]
): StromEnergieverbrauchEndenergieverbrauchApi => {
    const mappedEntries = entries.map((entry) => mapEntry(entry));
    const entriesSorted = mappedEntries.sort(dateSortFn);
    const entriesGrouped: StromEnergieverbrauchEndenergieverbrauchApi & {
        Statistik: StromEnergieverbrauchEndenergieverbrauchEntryApi[];
    } = groupBy(entriesSorted, 'perspektive');
    const statisticalData = entriesGrouped.Statistik;
    delete entriesGrouped.Statistik;
    // For each scenario we prepend the statistical portion
    const entriesFormatted = Object.entries(entriesGrouped).reduce(
        (prev, [currKey, currValue]) => ({
            ...prev,
            [currKey]: [...statisticalData, ...currValue]
        }),
        {} as StromEnergieverbrauchEndenergieverbrauchApi
    );
    return entriesFormatted;
};

const mapEntry = (
    entry: StromEnergieverbrauchEndenergieverbrauch
): StromEnergieverbrauchEndenergieverbrauchEntryApi => ({
    date: entry.date,
    elektrizitaet: entry.elektrizitaet,
    erdoelprodukte: entry.erdoelprodukte,
    fernwaerme: entry.fernwaerme,
    erdgas: entry.erdgas,
    holz: entry.holz,
    kohle: entry.kohle,
    abfaelle: entry.abfaelle,
    uebrigeErneuerbareEnergien: entry.uebrigeErneuerbareEnergien,
    ptx: entry.ptx,
    perspektive: entry.perspektive
});
