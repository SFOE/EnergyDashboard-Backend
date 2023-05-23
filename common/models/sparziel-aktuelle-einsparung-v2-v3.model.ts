import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface SparzielAktuelleEinsparungSourceV2V3 {
    Datum: string;
    Differenz_Mittelwert_prozent: string;
    TemperaturAbweichungNorm: string;
}

export interface SparzielAktuelleEinsparungV2V3 extends BaseModel, DateModel {
    differenzMittelwertProzent: number;
    temperaturAbweichungNorm: number;
}

export const map = (
    records: SparzielAktuelleEinsparungSourceV2V3[]
): SparzielAktuelleEinsparungV2V3[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: SparzielAktuelleEinsparungSourceV2V3
): SparzielAktuelleEinsparungV2V3 => ({
    id: createId(record.Datum),
    date: record.Datum,
    differenzMittelwertProzent: parseFloatOrNullForNA(
        record.Differenz_Mittelwert_prozent
    ),
    temperaturAbweichungNorm: parseFloatOrNullForNA(
        record.TemperaturAbweichungNorm
    )
});

export const createId = (date: string) => {
    return `sparziel-aktuelle-einsparung-v2-${date}`;
};
