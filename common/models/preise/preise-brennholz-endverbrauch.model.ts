import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseBrennholzEndverbrauchSource extends PreiseCommonSource {}

export interface PreiseBrennholzEndverbrauch extends PreiseCommon {}

export const map = (
    records: PreiseBrennholzEndverbrauchSource[]
): PreiseBrennholzEndverbrauch[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseBrennholzEndverbrauchSource
): PreiseBrennholzEndverbrauch =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
