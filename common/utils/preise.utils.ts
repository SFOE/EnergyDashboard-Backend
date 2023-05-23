import { DateModel } from '../models/base/date.model';
import {
    PreiseFutures,
    PreiseFuturesSource
} from '../models/preise/preise.common.model';
import { getUuid } from './id.utils';
import { isNumber, parseFloatOrNullForNA } from './number.utils';

export const sortFn = (a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime();

export const getMostRecentEntry = <T>(entries: T[]): T => {
    entries.sort(sortFn);
    return entries[entries.length - 1];
};

const RELEVANT_FROM_YEAR = 2020;

export const filterRelevantPriceEntries = <T extends DateModel>(
    entries: T[]
): T[] =>
    entries.filter((entry) => {
        const entryYear = parseInt(entry.date.split('-')[0]);
        return isNumber(entryYear) && entryYear >= RELEVANT_FROM_YEAR;
    });

export const mapFuturesRecord = (
    record: PreiseFuturesSource
): PreiseFutures => ({
    id: getUuid(),
    date: record.datum,
    monthPlusOne: parseFloatOrNullForNA(record.monat_plus_1),
    monthPlusTwo: parseFloatOrNullForNA(record.monat_plus_2),
    quaterPlusOne: parseFloatOrNullForNA(record.quartal_plus_1),
    quaterPlusTwo: parseFloatOrNullForNA(record.quartal_plus_2),
    yearPlusOne: parseFloatOrNullForNA(record.jahr_plus_1),
    yearPlusTwo: parseFloatOrNullForNA(record.jahr_plus_2)
});
