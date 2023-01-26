import { SparzielAktuelleEinsparung } from '/opt/nodejs/models/sparziel-aktuelle-einsparung.model';

export interface SparzielAktuelleEinsparungApi {
    date: string;
    differenzMittelwertProzent: number;
    temperatur: number;
}

export const mapToApiModel = (records: SparzielAktuelleEinsparung[]): SparzielAktuelleEinsparungApi[] => {
    return records.map(record => mapToApi(record));
};

export const mapToApi = (record: SparzielAktuelleEinsparung): SparzielAktuelleEinsparungApi => ({
    date: record.date,
    differenzMittelwertProzent: record.differenzMittelwertProzent || 0,
    temperatur: record.temperatur,
})
