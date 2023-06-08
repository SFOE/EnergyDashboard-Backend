import { PreiseFutures, PreiseFuturesSource } from './preise.common.model';
import {
    filterRelevantPriceEntries,
    mapFuturesRecord
} from '/opt/nodejs/utils/preise.utils';

export interface PreiseStromFuturesSource extends PreiseFuturesSource {}

export interface PreiseStromFutures extends PreiseFutures {}

export const map = (
    records: PreiseStromFuturesSource[]
): PreiseStromFutures[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapFuturesRecord(record))
    );
};
