import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromSparzielZielAktuellerMonatKundengruppeSource {
    letzte_Datenlieferung: string;
    national_savings_GWh: string;
    savings_private_GWh: string;
    savings_kmu_GWh: string;
    savings_industrie_GWh: string;
}

export interface StromSparzielZielAktuellerMonatKundengruppe extends BaseModel, DateModel {
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
    nationalSavingsGWh: number;
}

export const map = (
    records: StromSparzielZielAktuellerMonatKundengruppeSource[]
): StromSparzielZielAktuellerMonatKundengruppe[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: StromSparzielZielAktuellerMonatKundengruppeSource
): StromSparzielZielAktuellerMonatKundengruppe => ({
    id: getUuid(),
    date: record.letzte_Datenlieferung,
    anteilPrivate: parseFloat(record.savings_private_GWh),
    anteilIndustrie: parseFloat(record.savings_industrie_GWh),
    anteilKMU: parseFloat(record.savings_kmu_GWh),
    nationalSavingsGWh: parseFloat(record.national_savings_GWh)
});
