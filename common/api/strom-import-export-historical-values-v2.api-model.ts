import { StromImportExportHistoricalValueV2 } from '/opt/nodejs/models/strom-import-export-historical-values-v2.model';

export interface StromImportExportHistoricalValuesApiV2 {
    date: string;
    nettoimport: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: StromImportExportHistoricalValueV2[]): StromImportExportHistoricalValuesApiV2[] => {
    return records.map(record => map(record));
}

const map = (record: StromImportExportHistoricalValueV2): StromImportExportHistoricalValuesApiV2 => ({
    date: record.date,
    nettoimport: record.nettoimport,
    fiveYearMin: record.fiveYearMin,
    fiveYearMax: record.fiveYearMax,
    fiveYearMittelwert: record.fiveYearMittelwert,
    differenzMittelwert: record.differenzMittelwert,
    differenzMin: record.differenzMin,
    differenzMax: record.differenzMax,
});
