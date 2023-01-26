import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromImportExportHistoricalValueSource {
    KW: string;
    CH_Nettoimport_GWh: string;
    Min_5j: string;
    Max_5j: string;
    Mittelwert_5j: string;
    Diff_Mittelwert: string;
    Diff_Min: string;
    Diff_Max: string;
}

export interface StromImportExportHistoricalValue {
    kalenderwoche: number;
    nettoimport: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number  | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const map = (records: StromImportExportHistoricalValueSource[]): StromImportExportHistoricalValue[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromImportExportHistoricalValueSource): StromImportExportHistoricalValue => ({
    kalenderwoche: parseInt(record.KW),
    nettoimport: parseFloatOrNullForNA(record.CH_Nettoimport_GWh),
    fiveYearMin: parseFloat(record.Min_5j),
    fiveYearMax: parseFloat(record.Max_5j),
    fiveYearMittelwert: parseFloat(record.Mittelwert_5j),
    differenzMittelwert: parseFloatOrNullForNA(record.Diff_Mittelwert),
    differenzMin: parseFloatOrNullForNA(record.Diff_Min),
    differenzMax: parseFloatOrNullForNA(record.Diff_Max),
})
