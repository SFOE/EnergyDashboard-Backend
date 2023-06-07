import { DateModel } from '/opt/nodejs/models/base/date.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import {
    StromImportExportCountries,
    StromImportExportNetto
} from '/opt/nodejs/models/strom/strom-import-export-netto.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';

export interface StromImportExportNettoApi {
    currentEntry: StromImportExportNettoCurrentEntryApi;
    entries: StromImportExportNettoEntryApi[];
}

export interface StromImportExportNettoCurrentEntryApi extends DateModel {
    import: StromImportExportCountries;
    export: StromImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromImportExportNettoEntryApi extends DateModel {
    import: StromImportExportCountries;
    export: StromImportExportCountries;
}

export const mapToApiModel = (
    records: StromImportExportNetto[]
): StromImportExportNettoApi => {
    const sortedRecords = records.sort(dateSortFn);
    return {
        currentEntry: mapCurrentEntry(sortedRecords),
        entries: mapEntries(sortedRecords)
    };
};

const mapCurrentEntry = (
    records: StromImportExportNetto[]
): StromImportExportNettoCurrentEntryApi => {
    const currentEntry = records[records.length - 1];

    return {
        trend: currentEntry.trend,
        trendRating: currentEntry.trendRating,
        export: currentEntry.export,
        import: currentEntry.import,
        nettoImportCH: currentEntry.nettoImportCH,
        date: currentEntry.date
    };
};

const mapEntries = (
    records: StromImportExportNetto[]
): StromImportExportNettoEntryApi[] => {
    return records.map((record) => mapToApi(record));
};

const mapToApi = (
    record: StromImportExportNetto
): StromImportExportNettoEntryApi => ({
    date: record.date,
    import: {
        ...record.import
    },
    export: {
        ...record.export
    }
});
