import { groupBy } from '../../utils/array.utils';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import {
    Perspektive,
    StromEnergieverbrauchBruttoenergieverbrauch
} from '/opt/nodejs/models/strom/strom-energieverbrauch-bruttoenergieverbrauch';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export type StromEnergieverbrauchBruttoenergieverbrauchApi = {
    [perspektive in Exclude<
        Perspektive,
        'Statistik'
    >]: StromEnergieverbrauchBruttoenergieverbrauchEntryApi[];
};

export interface StromEnergieverbrauchBruttoenergieverbrauchEntryApi
    extends DateModel {
    holz: number | null;
    wasser: number | null;
    abfaelle: number | null;
    kohle: number | null;
    erdoel: number | null;
    erdgas: number | null;
    nuclear: number | null;
    uebrigeErneuerbareEnergien: number | null;
    ptx: number | null;
    perspektive: Perspektive;
}

export const mapToApiModel = (
    entries: StromEnergieverbrauchBruttoenergieverbrauch[]
): StromEnergieverbrauchBruttoenergieverbrauchApi => {
    const mappedEntries = entries.map((entry) => mapEntry(entry));
    const entriesSorted = mappedEntries.sort(dateSortFn);
    const entriesGrouped: StromEnergieverbrauchBruttoenergieverbrauchApi & {
        Statistik: StromEnergieverbrauchBruttoenergieverbrauchEntryApi[];
    } = groupBy(entriesSorted, 'perspektive');
    const statisticalData = entriesGrouped.Statistik;
    delete entriesGrouped.Statistik;
    // For each scenario we prepend the statistical portion
    const entriesFormatted = Object.entries(entriesGrouped).reduce(
        (prev, [currKey, currValue]) => ({
            ...prev,
            [currKey]: [...statisticalData, ...currValue]
        }),
        {} as StromEnergieverbrauchBruttoenergieverbrauchApi
    );
    return entriesFormatted;
};

const mapEntry = (
    entry: StromEnergieverbrauchBruttoenergieverbrauch
): StromEnergieverbrauchBruttoenergieverbrauchEntryApi => ({
    date: entry.date,
    holz: entry.holz,
    wasser: entry.wasser,
    abfaelle: entry.abfaelle,
    kohle: entry.kohle,
    erdoel: entry.erdoel,
    erdgas: entry.erdgas,
    nuclear: entry.nuclear,
    uebrigeErneuerbareEnergien: entry.uebrigeErneuerbareEnergien,
    ptx: entry.ptx,
    perspektive: entry.perspektive
});
