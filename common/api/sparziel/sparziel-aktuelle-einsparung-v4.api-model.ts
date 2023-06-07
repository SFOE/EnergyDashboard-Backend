import { SparzielAktuelleEinsparungV4 } from '/opt/nodejs/models/sparziel/sparziel-aktuelle-einsparung-v4.model';

export interface SparzielAktuelleEinsparungApiV4 {
    date: string;
    differenzMittelwertProzent: number;
    isEstimation: boolean;
    temperaturAbweichungNorm: number;
    differenzMittelwertWitterungsbereinigtProzent: number;
}

export const mapToApiModel = (
    records: SparzielAktuelleEinsparungV4[]
): SparzielAktuelleEinsparungApiV4[] => {
    return records.map((record) => mapToApi(record));
};

export const mapToApi = (
    record: SparzielAktuelleEinsparungV4
): SparzielAktuelleEinsparungApiV4 => ({
    date: record.date,
    differenzMittelwertProzent: record.differenzMittelwertProzent || 0,
    isEstimation: record.isEstimation,
    temperaturAbweichungNorm: record.temperaturAbweichungNorm,
    differenzMittelwertWitterungsbereinigtProzent: record.differenzMittelwertWitterungsbereinigtProzent
});
