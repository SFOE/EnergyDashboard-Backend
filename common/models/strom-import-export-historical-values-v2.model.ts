import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromImportExportHistoricalValueSourceV2 {
    Datum: string;
    Nettoimport_CH_GWh: string;
    Min_5j: string;
    Max_5j: string;
    Mittelwert_5j: string;
    Diff_Mittelwert: string;
    Diff_Min: string;
    Diff_Max: string;
}

export interface StromImportExportHistoricalValueV2 extends BaseModel, DateModel {
    id: string;
    date: string;
    nettoimport: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const map = (records: StromImportExportHistoricalValueSourceV2[]): StromImportExportHistoricalValueV2[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromImportExportHistoricalValueSourceV2): StromImportExportHistoricalValueV2 => ({
    id: createId(record.Datum),
    date: record.Datum,
    nettoimport: parseFloatOrNullForNA(record.Nettoimport_CH_GWh),
    fiveYearMin: parseFloat(record.Min_5j),
    fiveYearMax: parseFloat(record.Max_5j),
    fiveYearMittelwert: parseFloat(record.Mittelwert_5j),
    differenzMittelwert: parseFloatOrNullForNA(record.Diff_Mittelwert),
    differenzMin: parseFloatOrNullForNA(record.Diff_Min),
    differenzMax: parseFloatOrNullForNA(record.Diff_Max),
})

const createId = (date: string) => {
    return `strom-import-export-historical-values-v2-${date}`;
}
