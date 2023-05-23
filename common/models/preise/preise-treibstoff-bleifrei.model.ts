import {
    mapPreisCommon,
    PreiseCommon,
    PreiseCommonSource
} from '/opt/nodejs/models/preise/preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseTreibstoffBleifreiSource extends PreiseCommonSource {}

export interface PreiseTreibstoffBleifrei extends PreiseCommon {}

export const map = (
    records: PreiseTreibstoffBleifreiSource[]
): PreiseTreibstoffBleifrei[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (
    record: PreiseTreibstoffBleifreiSource
): PreiseTreibstoffBleifrei =>
    mapPreisCommon(record.Preis_LIK_indexiert, record.Datum);
