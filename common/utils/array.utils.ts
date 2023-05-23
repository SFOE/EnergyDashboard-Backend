export const sliceIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

export const groupBy = function(arr, key) {
    return arr.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const unique = <T>(arr: T[], attributeToBeUnique: string): T[] => {
    return [
        ...new Map(arr.map((item) => [item[attributeToBeUnique], item])).values(),
    ];
}