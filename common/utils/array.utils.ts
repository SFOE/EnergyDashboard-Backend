export const sliceIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
};

export const groupBy = function(arr, key) {
    return arr.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const unique = <T>(arr: T[], attributeToBeUnique: string): T[] => {
    return [
        ...new Map(arr.map((item) => [item[attributeToBeUnique], item])).values()
    ];
};

export const findLastIndex = <T>(array: T[], predicate: (element: T) => boolean) => {
    const maxIndex = array.length - 1;
    const reversedIndex = [...array].reverse().findIndex(predicate);
    return Math.abs(maxIndex - reversedIndex);
};
