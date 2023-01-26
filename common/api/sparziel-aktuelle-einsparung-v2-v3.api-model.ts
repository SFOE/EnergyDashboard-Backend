import { SparzielAktuelleEinsparungV2V3 } from '/opt/nodejs/models/sparziel-aktuelle-einsparung-v2-v3.model';

export interface SparzielAktuelleEinsparungApiV2V3 {
    date: string;
    differenzMittelwertProzent: number;
    temperaturAbweichungNorm: number;
}

export const mapToApiModel = (records: SparzielAktuelleEinsparungV2V3[]): SparzielAktuelleEinsparungApiV2V3[] => {
    return records.map(record => mapToApi(record));
};

export const mapToApi = (record: SparzielAktuelleEinsparungV2V3): SparzielAktuelleEinsparungApiV2V3 => ({
    date: record.date,
    differenzMittelwertProzent: record.differenzMittelwertProzent || 0,
    temperaturAbweichungNorm: record.temperaturAbweichungNorm,
})
