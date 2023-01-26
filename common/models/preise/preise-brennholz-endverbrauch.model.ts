import {
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseBrennholzEndverbrauchSource extends PreiseCommonSource {}

export interface PreiseBrennholzEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseBrennholzEndverbrauchSource[]
): PreiseBrennholzEndverbrauch[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseBrennholzEndverbrauchSource
): PreiseBrennholzEndverbrauch => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
