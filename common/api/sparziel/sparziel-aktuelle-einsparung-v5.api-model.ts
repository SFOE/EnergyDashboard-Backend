import { SparzielAktuelleEinsparungV5 } from '/opt/nodejs/models/sparziel/sparziel-aktuelle-einsparung-v5.model';

export interface SparzielAktuelleEinsparungApiV5 {
    date: string;
    differenzReferenzperiodeProzent: number;
    isEstimation: boolean;
    differenzReferenzperiodeWitterungsbereinigtProzent: number;
    differenzReferenzperiodeWitterungsbereingtProzentSchaetzung: boolean;
    differenzReferenzperiodeWitterungsbereingtLowerBound: number;
    differenzReferenzperiodeWitterungsbereingtUpperBound: number;
    temperaturAbweichungNorm: number;
}

export const mapToApiModel = (
    records: SparzielAktuelleEinsparungV5[]
): SparzielAktuelleEinsparungApiV5[] => {
    return records.map((record) => mapToApi(record));
};

export const mapToApi = (
    record: SparzielAktuelleEinsparungV5
): SparzielAktuelleEinsparungApiV5 => ({
    date: record.date,
    differenzReferenzperiodeProzent: record.differenzReferenzperiodeProzent || 0,
    isEstimation: record.isEstimation,
    differenzReferenzperiodeWitterungsbereinigtProzent: record.differenzReferenzperiodeWitterungsbereinigtProzent,
    differenzReferenzperiodeWitterungsbereingtProzentSchaetzung: record.differenzReferenzperiodeWitterungsbereingtProzentSchaetzung,
    differenzReferenzperiodeWitterungsbereingtLowerBound: record.differenzReferenzperiodeWitterungsbereingtLowerBound,
    differenzReferenzperiodeWitterungsbereingtUpperBound: record.differenzReferenzperiodeWitterungsbereingtUpperBound,
    temperaturAbweichungNorm: record.temperaturAbweichungNorm
});
