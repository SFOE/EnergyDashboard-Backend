import {
    PreiseCommon, PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseTreibstoffDieselSource extends PreiseCommonSource {}

export interface PreiseTreibstoffDiesel extends PreiseCommon {}

export const map = (
    records: PreiseTreibstoffDieselSource[]
): PreiseTreibstoffDiesel[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: PreiseTreibstoffDieselSource
): PreiseTreibstoffDiesel => ({
    date: record.Datum,
    preisIndexiert: parseFloatOrNullForNA(record.Preis_LIK_indexiert)
});
