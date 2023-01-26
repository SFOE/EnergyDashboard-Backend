import {
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseGasEndverbrauchSource extends PreiseCommonSource {}

export interface PreiseGasEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseGasEndverbrauchSource[]
): PreiseGasEndverbrauch[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseGasEndverbrauchSource
): PreiseGasEndverbrauch => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
