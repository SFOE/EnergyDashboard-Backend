import {
    StromSparzielZielAktuellerMonatKundengruppe
} from '/opt/nodejs/models/strom/strom-sparziel-ziel-aktueller-monat-kundengruppe.model';

export interface StromSparzielZielAktuellerMonatKundengruppeApiModel {
    date: string;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
    nationalSavingsGWh: number;
}

export const mapToApiModel = (
    record: StromSparzielZielAktuellerMonatKundengruppe
): StromSparzielZielAktuellerMonatKundengruppeApiModel => ({
    date: record.date,
    anteilPrivate: record.anteilPrivate,
    anteilKMU: record.anteilKMU,
    anteilIndustrie: record.anteilIndustrie,
    nationalSavingsGWh: record.nationalSavingsGWh
});
