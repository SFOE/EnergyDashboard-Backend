import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseGasEndverbrauchSource extends PreiseCommonSource {}

export interface PreiseGasEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseGasEndverbrauchSource[]
): PreiseGasEndverbrauch[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseGasEndverbrauchSource
): PreiseGasEndverbrauch =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
