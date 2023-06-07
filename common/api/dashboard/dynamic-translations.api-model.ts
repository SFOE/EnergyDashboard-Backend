import { DynamicTranslation } from '/opt/nodejs/models/dashboard/dynamic-translation.model';

export interface DynamicTranslationsApi {
    de: TranslationKeys,
    fr: TranslationKeys,
    it: TranslationKeys,
    en: TranslationKeys
}

type TranslationKeys = {
    [key: string]: string,
}

export const mapToApiModel = (translations: DynamicTranslation[]): DynamicTranslationsApi => {
    const de: TranslationKeys = {};
    const fr: TranslationKeys = {};
    const it: TranslationKeys = {};
    const en: TranslationKeys = {};

    translations.forEach(translation => {
        de[translation.key] = translation.de;
        fr[translation.key] = translation.fr;
        it[translation.key] = translation.it;
        en[translation.key] = translation.en;
    });

    return {
        de,
        fr,
        it,
        en
    };
};
