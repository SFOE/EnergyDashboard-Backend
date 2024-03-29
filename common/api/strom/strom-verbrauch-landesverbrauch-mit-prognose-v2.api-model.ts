import { DateModel } from '/opt/nodejs/models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '/opt/nodejs/models/base/statistics.model';
import { findEntryByDate, getYesterday, isDateBeforeOrEqualsToday } from '/opt/nodejs/utils/date.utils';
import {
    StromVerbrauchLandesverbrauchMitPrognoseV2
} from '/opt/nodejs/models/strom/strom-verbrauch-landesverbrauch-mit-prognose-v2.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';

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
    return findEntryByDate(records, yesterday);
};

const getEntryInFiveDays = (
    records: StromVerbrauchLandesverbrauchMitPrognoseV2[]
) => {
    const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
    return findEntryByDate(records, date);
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
