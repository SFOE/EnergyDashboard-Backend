import {
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseFernwaermeEndverbrauchSource
    extends PreiseCommonSource {}

export interface PreiseFernwaermeEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseFernwaermeEndverbrauchSource[]
): PreiseFernwaermeEndverbrauch[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseFernwaermeEndverbrauchSource
): PreiseFernwaermeEndverbrauch => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
