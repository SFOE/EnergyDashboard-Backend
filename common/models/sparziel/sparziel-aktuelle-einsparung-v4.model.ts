import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { parseStringToBool } from '/opt/nodejs/utils/string.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface SparzielAktuelleEinsparungSourceV4 {
    Datum: string;
    Differenz_Mittelwert_prozent: string;
    Schaetzung: string;
    TemperaturAbweichungNorm: string;
    Differenz_Mittelwert_witterungsbereingt_prozent: string;
    Differenz_Mittelwert_witterungsbereingt_lower_bound: string;
    Differenz_Mittelwert_witterungsbereingt_upper_bound: string;
}

export interface SparzielAktuelleEinsparungV4 extends BaseModel, DateModel {
    differenzMittelwertProzent: number;
    isEstimation: boolean;
    temperaturAbweichungNorm: number;
    differenzMittelwertWitterungsbereinigtProzent: number;
}

export const map = (
    records: SparzielAktuelleEinsparungSourceV4[]
): SparzielAktuelleEinsparungV4[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: SparzielAktuelleEinsparungSourceV4
): SparzielAktuelleEinsparungV4 => ({
    id: getUuid(),
    date: record.Datum,
    differenzMittelwertProzent: parseFloatOrNullForNA(
        record.Differenz_Mittelwert_prozent
    ),
    isEstimation: parseStringToBool(record.Schaetzung),
    temperaturAbweichungNorm: parseFloatOrNullForNA(
        record.TemperaturAbweichungNorm
    ),
    differenzMittelwertWitterungsbereinigtProzent: parseFloatOrNullForNA(record.Differenz_Mittelwert_witterungsbereingt_prozent)
});
