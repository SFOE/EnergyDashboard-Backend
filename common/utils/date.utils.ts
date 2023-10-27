import { DateModel } from '/opt/nodejs/models/base/date.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

const currentYear = new Date().getFullYear(); // TODO: Beware

export const mapDateMonthAndDay = (month: number, day: number) => {
    const date = new Date(currentYear, month - 1, day).toISOString();
    return splitDateFromIsoString(date);
};

export const mapDateYearAndMonth = (year: number, month: number) => {
    const date = new Date(year, month - 1, 1).toISOString();
    return splitDateFromIsoString(date);
};

export const mapDateWithMonth = (month: number) => {
    const date = new Date(currentYear, month - 1, 1).toISOString();
    return splitDateFromIsoString(date);
};


export const getFirstMondayOfTheYear = (year: number) => {
    let day = 1;
    let date = new Date(year, 0, day);
    while (date.getDay() !== 1) {
        day += 1;
        date = new Date(year, 0, day);
    }

    return date;
};

const firstMondayOfCurrentYear = getFirstMondayOfTheYear(
    new Date().getFullYear()
);

export const oneWeekInMilliseconds = 6.048e8;

export const convertWeekNumberToDate = (weekNumber: number, year: number = currentYear) => {
    let startDate = firstMondayOfCurrentYear;
    if (year !== firstMondayOfCurrentYear.getFullYear()) {
        startDate = getFirstMondayOfTheYear(year);
    }

    const date = new Date(
        startDate.getTime() + oneWeekInMilliseconds * (weekNumber - 1)
    );

    return splitDateFromIsoString(date.toISOString());
};

export const isSameDate = (a: Date, b: Date): boolean => {
    return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
};

export const isBeforeOrEqualsToday = (month: number, day: number) => {
    const today = new Date();
    return month < today.getMonth() ||
        (month === today.getMonth() && day < today.getDate());
};

export const isDateBeforeOrEqualsToday = (date: Date) => {
    const today = new Date();
    return date.getFullYear() < today.getFullYear() ||
        (date.getFullYear() === today.getFullYear() &&
            (date.getMonth() < today.getMonth() ||
                (date.getMonth() === today.getMonth() && date.getDate() < today.getDate())));
};

export const getYearOfToday = () => {
    return new Date().getFullYear();
};

export const getMonthOfToday = () => {
    return new Date().getMonth() + 1;
};

export const getDayInMonthOfToday = () => {
    return new Date().getDate();
};

export const getDayInMonthOfYesterday = () => {
    return getYesterday().getDate();
};

export const getCurrentDateAsIsoString = () => {
    const date = new Date().toISOString();
    return splitDateFromIsoString(date);
};

export const getYesterdaysDateAsIsoString = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return splitDateFromIsoString(date.toISOString());
};

export const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
};

export const getNumberOfDaysAgo = (numberOfDays: number) => {
    const date = new Date();
    date.setDate(date.getDate() - numberOfDays);
    return date;
};

export const getLastCalendarWeek = () => {
    const oneWeekAgo = getNumberOfDaysAgo(7);
    const startDate = new Date(oneWeekAgo.getFullYear(), 0, 1);
    const days = Math.floor((oneWeekAgo.getTime() - startDate.getTime()) /
        (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
};

const splitDateFromIsoString = (date: string): string => {
    return date.split('T')[0];
};

export const findEntryByDate = <T extends DateModel>(
    records: T[],
    date: Date
): T => {
    return records.find((entry) => isSameDate(new Date(entry.date), date));
};

export const getMostRecentDate = (entries: DateModel[]): string => {
    const sortedEntries = entries.sort(dateSortFn);
    const currentEntry = sortedEntries[sortedEntries.length - 1];
    return currentEntry.date;
};