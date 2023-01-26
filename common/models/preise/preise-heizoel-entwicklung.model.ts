import {
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseHeizoelEntwicklungSource extends PreiseCommonSource {}

export interface PreiseHeizoelEntwicklung extends PreiseCommon {}

export const map = (
    records: PreiseHeizoelEntwicklungSource[]
): PreiseHeizoelEntwicklung[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseHeizoelEntwicklungSource
): PreiseHeizoelEntwicklung => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
