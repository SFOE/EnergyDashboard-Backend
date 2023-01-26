import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseGasBoerseSource {
    Datum: string;
    Preis_Boerse_indexiert: string;
}

export interface PreiseGasBoerse {
    date: string;
    preisIndexiert: number;
}

export const map = (records: PreiseGasBoerseSource[]): PreiseGasBoerse[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: PreiseGasBoerseSource): PreiseGasBoerse => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_Boerse_indexiert),
})
