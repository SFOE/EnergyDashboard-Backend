import {
    StromSparzielEinsparungProMonatKundengruppe
} from '/opt/nodejs/models/strom-sparziel-einsparung-pro-monat-kundengruppe.model';

export interface StromSparzielEinsparungProMonatKundengruppeApiModel {
    date: string;
    anteilPrivate: number | null;
    anteilKMU: number | null;
    anteilIndustrie: number | null;
    nationalSavingsPercent: number | null;
}

export const mapToApiModel = (
    records: StromSparzielEinsparungProMonatKundengruppe[]
): StromSparzielEinsparungProMonatKundengruppeApiModel[] => {
    return records.map((record) => mapToApi(record));
};

export const mapToApi = (
    record: StromSparzielEinsparungProMonatKundengruppe
): StromSparzielEinsparungProMonatKundengruppeApiModel => ({
    date: record.date,
    anteilPrivate: record.anteilPrivate,
    anteilKMU: record.anteilKMU,
    anteilIndustrie: record.anteilIndustrie,
    nationalSavingsPercent: record.nationalSavingsPercent
});
