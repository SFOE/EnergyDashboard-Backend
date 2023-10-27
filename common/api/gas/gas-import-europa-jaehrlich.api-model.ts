import { GasImportEuropaJaehrlich } from '/opt/nodejs/models/gas/gas-import-europa-jaehrlich.model';

export interface GasImportEuropaJaehrlichApi {
    [year: number]: GasImportEuropaJaehrlichCountryEntryApi;
}

export interface GasImportEuropaJaehrlichCountryEntryApi {
    [land: string]: GasImportEuropaJaehrlichEntryApi;
}

export interface GasImportEuropaJaehrlichEntryApi {
    millM3: number;
    prozent: number;
    stand: string;
}

export const mapToApiModel = (
    records: GasImportEuropaJaehrlich[]
): GasImportEuropaJaehrlichApi => {
    const gasImportJaehrlich: GasImportEuropaJaehrlichApi = {};

    records.forEach((entry) => {
        const mappedEntry = mapToApi(entry);
        const year = entry.jahr;
        const country = entry.land;

        if (!gasImportJaehrlich[year]) {
            gasImportJaehrlich[year] = {};
        }

        gasImportJaehrlich[year][country] = mappedEntry;
    });
    return gasImportJaehrlich;
};

export const mapToApi = (
    record: GasImportEuropaJaehrlich
): GasImportEuropaJaehrlichEntryApi => {
    return {
        millM3: record.millM3,
        prozent: record.prozent,
        stand: record.stand
    };
};
