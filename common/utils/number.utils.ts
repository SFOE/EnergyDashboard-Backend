export const parseIntOrNullForNA = (value: string): number | null => {
    if (value == null) {
        return null;
    }

    if ('' === value) {
        return null;
    }

    if ('NA' === value) {
        return null;
    }

    return parseInt(value);
};

export const parseFloatOrNullForNA = (value: string): number | null => {
    if (value == null) {
        return null;
    }

    if ('' === value) {
        return null;
    }

    if ('NA' === value) {
        return null;
    }

    return parseFloat(value);
};

export const isNumber = (value: any): boolean => {
    const isDefined = value !== '' && value !== null && value !== undefined;
    return isDefined && !Number.isNaN(value);
};
