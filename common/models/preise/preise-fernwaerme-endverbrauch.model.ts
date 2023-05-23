import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseFernwaermeEndverbrauchSource
    extends PreiseCommonSource {}

export interface PreiseFernwaermeEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseFernwaermeEndverbrauchSource[]
): PreiseFernwaermeEndverbrauch[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseFernwaermeEndverbrauchSource
): PreiseFernwaermeEndverbrauch =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
