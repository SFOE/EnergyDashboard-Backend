import { StromImportExportCountries, StromImportExportNetto } from '/opt/nodejs/models/strom-import-export-netto.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface StromImportExportNettoApi {
    currentEntry: StromImportExportNettoCurrentEntryApi,
    entries: StromImportExportNettoEntryApi[]
}

export interface StromImportExportNettoCurrentEntryApi {
    datum: Date;
    import: StromImportExportCountries;
    export: StromImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromImportExportNettoEntryApi {
    datum: Date;
    import: StromImportExportCountries;
    export: StromImportExportCountries;
}

export const mapToApiModel = (records: StromImportExportNetto[]): StromImportExportNettoApi => {
    const sortedRecords = records.sort(sortFn);
    return {
        currentEntry: mapCurrentEntry(sortedRecords),
        entries: mapEntries(sortedRecords),
    }
}

const mapCurrentEntry = (records: StromImportExportNetto[]): StromImportExportNettoCurrentEntryApi => {
    const currentEntry = records[records.length - 1];

    return {
        trend: currentEntry.trend,
        trendRating: currentEntry.trendRating,
        export: currentEntry.export,
        import: currentEntry.import,
        nettoImportCH: currentEntry.nettoImportCH,
        datum: new Date(currentEntry.datum),
    }
}

const mapEntries = (records: StromImportExportNetto[]): StromImportExportNettoEntryApi[] => {
    return records
        .map((record) => mapToApi(record))
}

const sortFn = (a: StromImportExportNetto, b: StromImportExportNetto) => new Date(a.datum).getTime() - new Date(b.datum).getTime();

const mapToApi = (record: StromImportExportNetto): StromImportExportNettoEntryApi => ({
    datum: new Date(record.datum),
    import: {
        ...record.import,
    },
    export: {
        ...record.export,
    },
})
