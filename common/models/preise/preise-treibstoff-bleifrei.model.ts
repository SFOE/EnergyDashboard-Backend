import {
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseTreibstoffBleifreiSource extends PreiseCommonSource {}

export interface PreiseTreibstoffBleifrei extends PreiseCommon {}

export const map = (
    records: PreiseTreibstoffBleifreiSource[]
): PreiseTreibstoffBleifrei[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseTreibstoffBleifreiSource
): PreiseTreibstoffBleifrei => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
