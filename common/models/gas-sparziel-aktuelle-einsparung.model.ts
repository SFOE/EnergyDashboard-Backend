import { BaseModel } from './base/base.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface GasSparzielAktuelleEinsparungSource {
    Monat: string;
    Jahr: string;
    Differenz_Mittelwert_prozent: string;
    Temperatur: string;
}

export interface GasSparzielAktuelleEinsparung extends BaseModel {
    monat: number;
    jahr: number;
    differenzMittelwertProzent: number;
    temperatur: number;
}

export const map = (
    records: GasSparzielAktuelleEinsparungSource[]
): GasSparzielAktuelleEinsparung[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: GasSparzielAktuelleEinsparungSource
): GasSparzielAktuelleEinsparung => ({
    id: createId(record.Monat, record.Jahr),
    monat: parseInt(record.Monat),
    jahr: parseInt(record.Jahr),
    differenzMittelwertProzent: parseFloatOrNullForNA(
        record.Differenz_Mittelwert_prozent
    ),
    temperatur: parseFloatOrNullForNA(record.Temperatur)
});

export const createId = (month: string, year: string) => {
    return `${month}-${year}`;
};
