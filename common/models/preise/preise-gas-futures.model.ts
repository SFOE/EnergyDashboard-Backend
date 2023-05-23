import { PreiseFutures, PreiseFuturesSource } from './preise.common.model';
import {
    filterRelevantPriceEntries,
    mapFuturesRecord
} from '/opt/nodejs/utils/preise.utils';

export interface PreiseGasFuturesSource extends PreiseFuturesSource {
}

export interface PreiseGasFutures extends PreiseFutures {
}

export const map = (records: PreiseGasFuturesSource[]): PreiseGasFutures[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapFuturesRecord(record))
    );
};
