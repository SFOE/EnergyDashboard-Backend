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

export const isFilenameEndingWith = (filename: string, endings: string[]): boolean => {
    for (const ending of endings) {
        if (filename.endsWith(ending)) {
            return true;
        }
    }
    return false;
};