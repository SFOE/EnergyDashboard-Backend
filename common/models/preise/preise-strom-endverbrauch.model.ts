import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseStromEndverbrauchSource extends PreiseCommonSource {}

export interface PreiseStromEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseStromEndverbrauchSource[]
): PreiseStromEndverbrauch[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseStromEndverbrauchSource
): PreiseStromEndverbrauch =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
