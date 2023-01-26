export const getNextIndexForKey = (key: string, allIndices: object): number => {
    if (!allIndices[key]) {
        allIndices[key] = 0;
    }
    allIndices[key]++;

    return allIndices[key];
}
