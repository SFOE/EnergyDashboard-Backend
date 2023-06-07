import {
    StromSparzielEinsparungProMonatKundengruppeV2
} from '/opt/nodejs/models/strom/strom-sparziel-einsparung-pro-monat-kundengruppe-v2.model';

export interface StromSparzielEinsparungProMonatKundengruppeApiModelV2 {
    date: string;
    anteilPrivate: number | null;
    anteilKMU: number | null;
    anteilIndustrie: number | null;
    nationalSavingsPercent: number | null;
}

export const mapToApiModel = (
    records: StromSparzielEinsparungProMonatKundengruppeV2[]
): StromSparzielEinsparungProMonatKundengruppeApiModelV2[] => {
    return records.map((record) => mapToApi(record));
};

export const mapToApi = (
    record: StromSparzielEinsparungProMonatKundengruppeV2
): StromSparzielEinsparungProMonatKundengruppeApiModelV2 => ({
    date: record.date,
    anteilPrivate: record.anteilPrivate,
    anteilKMU: record.anteilKMU,
    anteilIndustrie: record.anteilIndustrie,
    nationalSavingsPercent: record.nationalSavingsPercent
});
