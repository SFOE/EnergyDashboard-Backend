export const parseStringOrNullForNA = (value: string): string | null => {
    if ('NA' === value) {
        return null;
    }

    if ('' === value) {
        return null;
    }

    return value;
}
