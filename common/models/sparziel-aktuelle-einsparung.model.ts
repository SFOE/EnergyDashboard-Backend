import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface SparzielAktuelleEinsparungSource {
    Datum: string;
    Differenz_Mittelwert_prozent: string;
    Temperatur: string;
}

export interface SparzielAktuelleEinsparung extends BaseModel, DateModel {
    id: string;
    date: string;
    differenzMittelwertProzent: number;
    temperatur: number;
}

export const map = (records: SparzielAktuelleEinsparungSource[]): SparzielAktuelleEinsparung[] => {
    return records.map(record => mapRecord(record));
}

export const mapRecord = (record: SparzielAktuelleEinsparungSource): SparzielAktuelleEinsparung => ({
    id: createId(record.Datum),
    date: record.Datum,
    differenzMittelwertProzent: parseFloatOrNullForNA(record.Differenz_Mittelwert_prozent),
    temperatur: parseFloatOrNullForNA(record.Temperatur),
})

export const createId = (date: string) => {
    return `sparziel-aktuelle-einsparung-v2-${date}`;
}
