import {
    StromSparzielEinsparungAktuellerMonatKundengruppe
} from '/opt/nodejs/models/strom-sparziel-einsparung-aktueller-monat-kundengruppe.model';

export interface StromSparzielEinsparungAktuellerMonatKundengruppeApiModel {
    date: string;
    anteilPrivate: number | null;
    anteilKMU: number | null;
    anteilIndustrie: number | null;
    nationalSavingsPercent: number | null;
    nationalSavingsMWh: number | null;
}

export const mapToApiModel = (
    records: StromSparzielEinsparungAktuellerMonatKundengruppe[]
): StromSparzielEinsparungAktuellerMonatKundengruppeApiModel[] => {
    return records.map((record) => mapToApi(record));
};

export const mapToApi = (
    record: StromSparzielEinsparungAktuellerMonatKundengruppe
): StromSparzielEinsparungAktuellerMonatKundengruppeApiModel => ({
    date: record.date,
    anteilPrivate: record.anteilPrivate,
    anteilKMU: record.anteilKMU,
    anteilIndustrie: record.anteilIndustrie,
    nationalSavingsPercent: record.nationalSavingsPercent,
    nationalSavingsMWh: record.nationalSavingsMWh
});
