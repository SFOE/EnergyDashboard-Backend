import { BaseModel } from './base/base.model';

export interface SpartippsSource {
    id: string;
    kategorie: string;
    titel_de: string;
    text_de: string;
    titel_fr: string;
    text_fr: string;
    titel_en: string;
    text_en: string;
    titel_it: string;
    text_it: string;
}

export interface Spartipps extends BaseModel {
    kategorie: string;
    de: SpartippsLanguageEntry;
    fr: SpartippsLanguageEntry;
    en: SpartippsLanguageEntry;
    it: SpartippsLanguageEntry;
}

export interface SpartippsLanguageEntry {
    title: string;
    text: string;
}

export const map = (records: SpartippsSource[]): Spartipps[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (source: SpartippsSource): Spartipps => {
    return {
        id: source.id,
        kategorie: source.kategorie,
        de: {
            title: source.titel_de,
            text: source.text_de
        },
        fr: {
            title: source.titel_fr,
            text: source.text_fr
        },
        en: {
            title: source.titel_en,
            text: source.text_en
        },
        it: {
            title: source.titel_it,
            text: source.text_it
        }
    };
};
