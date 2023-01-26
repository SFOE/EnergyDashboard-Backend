export interface DynamicTranslationSource {
    [key: string]: Translation
}

export interface Translation {
    de: string;
    fr: string;
    it: string;
    en: string;
}

export interface DynamicTranslation extends Translation {
    key: string
}

export const map = (translations: DynamicTranslationSource): DynamicTranslation[] => {
    return Object.keys(translations)
        .map(key => ({
            key,
            ...translations[key],
        }))
}
