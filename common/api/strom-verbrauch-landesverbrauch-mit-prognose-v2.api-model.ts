import { DateModel } from '../models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '../models/base/statistics.model';
import {
    getYesterday,
    isDateBeforeOrEqualsToday,
    isSameDate
} from '../utils/date.utils';
import { StromVerbrauchLandesverbrauchMitPrognoseV2 } from '/opt/nodejs/models/strom-verbrauch-landesverbrauch-mit-prognose-v2.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface StromVerbrauchLandesverbrauchMitPrognoseApiV2 {
    currentEntry: StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApiV2;
    entries: StromVerbrauchLandesverbrauchMitPrognoseEntryApiV2[];
}

export interface StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApiV2 {
    landesverbrauchPrognose: number | null;
    landesverbrauchPrognoseInFiveDays: number | null;
    date: string;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromVerbrauchLandesverbrauchMitPrognoseEntryApiV2
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    landesverbrauch: number | null;
    landesverbrauchGeschaetzt: number | null;
    landesverbrauchPrognose: number | null;
}

export const mapToApiModel = (
    records: StromVerbrauchLandesverbrauchMitPrognoseV2[]
): StromVerbrauchLandesverbrauchMitPrognoseApiV2 => {
    const entryToday = getEntryYesterday(records);
    console.log(`entryToday: ${entryToday}`);

    const entryInFiveDays = getEntryInFiveDays(records);
    console.log(`entryInFiveDays: ${entryInFiveDays}`);
    const entries = records.map((record) => mapToApi(record));
    return {
        currentEntry: mapCurrentEntry(entryToday, entryInFiveDays),
        entries
    };
};

const getEntryYesterday = (
    records: StromVerbrauchLandesverbrauchMitPrognoseV2[]
) => {
    const yesterday = getYesterday();
    return findEntry(records, yesterday);
};

const getEntryInFiveDays = (
    records: StromVerbrauchLandesverbrauchMitPrognoseV2[]
) => {
    const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
    return findEntry(records, date);
};

const findEntry = (
    records: StromVerbrauchLandesverbrauchMitPrognoseV2[],
    date: Date
): StromVerbrauchLandesverbrauchMitPrognoseV2 => {
    return records.find((entry) => isSameDate(new Date(entry.date), date));
};

const mapCurrentEntry = (
    entry: StromVerbrauchLandesverbrauchMitPrognoseV2,
    entryInFiveDays: StromVerbrauchLandesverbrauchMitPrognoseV2
): StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApiV2 => {
    return {
        landesverbrauchPrognose: entry.landesverbrauchPrognose,
        landesverbrauchPrognoseInFiveDays:
            entryInFiveDays.landesverbrauchPrognose,
        date: entry.date,
        trend: entry.trend,
        trendRating: entry.trendRating
    };
};

const mapToApi = ({
    date,
    landesverbrauch,
    landesverbrauchPrognose,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax
}: StromVerbrauchLandesverbrauchMitPrognoseV2): StromVerbrauchLandesverbrauchMitPrognoseEntryApiV2 => {
    const isBeforeToday = isDateBeforeOrEqualsToday(new Date(date));

    return {
        landesverbrauch,
        landesverbrauchGeschaetzt: isBeforeToday
            ? landesverbrauchPrognose
            : null,
        landesverbrauchPrognose: isBeforeToday ? null : landesverbrauchPrognose,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date,
        differenzMittelwert,
        differenzMin,
        differenzMax
    };
};
