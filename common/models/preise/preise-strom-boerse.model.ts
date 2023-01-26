import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseStromBoerseSource {
    Datum: string;
    Baseload_EUR_MWh: string;
}

export interface PreiseStromBoerse {
    date: string;
    preisEUR: number;
}

export const map = (records: PreiseStromBoerseSource[]): PreiseStromBoerse[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: PreiseStromBoerseSource): PreiseStromBoerse => ({
    date: record.Datum,
    preisEUR: parseFloatOrNullForNA(record.Baseload_EUR_MWh),
})
