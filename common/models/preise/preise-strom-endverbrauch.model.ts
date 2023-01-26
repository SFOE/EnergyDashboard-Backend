import {
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseStromEndverbrauchSource extends PreiseCommonSource {}

export interface PreiseStromEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseStromEndverbrauchSource[]
): PreiseStromEndverbrauch[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseStromEndverbrauchSource
): PreiseStromEndverbrauch => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
