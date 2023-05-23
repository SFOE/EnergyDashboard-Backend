import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface DynamicTranslationSource {
    [key: string]: Translation;
}

export interface Translation {
    de: string;
    fr: string;
    it: string;
    en: string;
}

export interface DynamicTranslation extends Translation, BaseModel {
    key: string;
}

export const map = (translations: DynamicTranslationSource): DynamicTranslation[] => {
    return Object.keys(translations)
        .map(key => ({
            id: getUuid(),
            key,
            ...translations[key]
        }));
};
