import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseHeizoelEntwicklungSource extends PreiseCommonSource {}

export interface PreiseHeizoelEntwicklung extends PreiseCommon {}

export const map = (
    records: PreiseHeizoelEntwicklungSource[]
): PreiseHeizoelEntwicklung[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseHeizoelEntwicklungSource
): PreiseHeizoelEntwicklung =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
