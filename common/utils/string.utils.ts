export const parseStringOrNullForNA = (value: string): string | null => {
    if ('NA' === value) {
        return null;
    }

    if ('' === value) {
        return null;
    }

    return value;
};

export const parseStringToBool = (str: string): boolean => {
    return str.toLowerCase() === 'true';
};

export const containsSVGinFilename = (fileName: string): boolean => {
    const regex = new RegExp(/\S+(.*?).(svg)$/);

    return regex.test(fileName);
};
