export const sortFn = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();

export const getMostRecentEntry = <T>(entries: T[]): T => {
    entries.sort(sortFn);
    return entries[entries.length - 1];
}
