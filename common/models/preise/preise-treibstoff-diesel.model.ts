import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseTreibstoffDieselSource extends PreiseCommonSource {}

export interface PreiseTreibstoffDiesel extends PreiseCommon {}

export const map = (
    records: PreiseTreibstoffDieselSource[]
): PreiseTreibstoffDiesel[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseTreibstoffDieselSource
): PreiseTreibstoffDiesel =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
