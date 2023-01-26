import { StromVerbrauchHistoricalValue } from '/opt/nodejs/models/strom-verbrauch-historical-values.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { getYesterday, isBeforeOrEqualsToday, mapDateMonthAndDay } from '../utils/date.utils';

export interface StromVerbrauchHistoricalValuesApi {
    currentEntry: StromVerbrauchHistoricalValuesCurrentEntryApi,
    entries: StromVerbrauchHistoricalValuesEntryApi[]
}

export interface StromVerbrauchHistoricalValuesCurrentEntryApi {
    landesverbrauchPrognose: number | null;
    landesverbrauchPrognoseInFiveDays: number | null;
    date: string;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromVerbrauchHistoricalValuesEntryApi {
    landesverbrauch: number | null;
    landesverbrauchGeschaetzt: number | null;
    landesverbrauchPrognose: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: StromVerbrauchHistoricalValue[]): StromVerbrauchHistoricalValuesApi => {
    const entryToday = getEntryYesterday(records);
    console.log(`entryToday: ${entryToday}`);

    const entryInFiveDays = getEntryInFiveDays(records);
    console.log(`entryInFiveDays: ${entryInFiveDays}`);
    const entries = records.map(record => mapToApi(record));
    return {
        currentEntry: mapCurrentEntry(entryToday, entryInFiveDays),
        entries,
    }
};

const getEntryYesterday = (records: StromVerbrauchHistoricalValue[]) => {
    const yesterday = getYesterday();
    return findEntry(records, yesterday);
}

const getEntryInFiveDays = (records: StromVerbrauchHistoricalValue[]) => {
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    return findEntry(records, date);
}

const findEntry = (records: StromVerbrauchHistoricalValue[], date: Date): StromVerbrauchHistoricalValue => {
    return records
        .find(entry => entry.monat - 1 === date.getMonth() && entry.tag === date.getDate())
}

const mapCurrentEntry = (entry: StromVerbrauchHistoricalValue, entryInFiveDays: StromVerbrauchHistoricalValue): StromVerbrauchHistoricalValuesCurrentEntryApi => {
    return {
        landesverbrauchPrognose: entry.landesverbrauchPrognose,
        landesverbrauchPrognoseInFiveDays: entryInFiveDays.landesverbrauchPrognose,
        date: mapDateMonthAndDay(entry.monat, entry.tag),
        trend: entry.trend,
        trendRating: entry.trendRating,
    }
}

const mapToApi = ({
    monat,
    tag,
    landesverbrauch,
    landesverbrauchPrognose,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax,
}: StromVerbrauchHistoricalValue): StromVerbrauchHistoricalValuesEntryApi => {
    const isBeforeToday = isBeforeOrEqualsToday(monat - 1, tag);

    return {
        landesverbrauch,
        landesverbrauchGeschaetzt: isBeforeToday ? landesverbrauchPrognose : null,
        landesverbrauchPrognose: isBeforeToday ? null : landesverbrauchPrognose,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date: mapDateMonthAndDay(monat, tag),
        differenzMittelwert,
        differenzMin,
        differenzMax,
    }
}
