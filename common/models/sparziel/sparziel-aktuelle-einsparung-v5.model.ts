import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { parseStringToBool } from '/opt/nodejs/utils/string.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface SparzielAktuelleEinsparungSourceV5 {
    Datum: string;
    Differenz_Referenzperiode_Prozent: string;
    Differenz_Referenzperiode_Prozent_Schaetzung: string;
    Differenz_Referenzperiode_witterungsbereingt_Prozent: string;
    Differenz_Referenzperiode_witterungsbereingt_Prozent_Schaetzung: string;
    Differenz_Referenzperiode_witterungsbereingt_lower_bound: string;
    Differenz_Referenzperiode_witterungsbereingt_upper_bound: string;
    Temperatur_Abweichung_Norm: string;
}

export interface SparzielAktuelleEinsparungV5 extends BaseModel, DateModel {
    differenzReferenzperiodeProzent: number;
    isEstimation: boolean;
    differenzReferenzperiodeWitterungsbereinigtProzent: number;
    differenzReferenzperiodeWitterungsbereingtProzentSchaetzung: boolean;
    differenzReferenzperiodeWitterungsbereingtLowerBound: number;
    differenzReferenzperiodeWitterungsbereingtUpperBound: number;
    temperaturAbweichungNorm: number;
}

export const map = (
    records: SparzielAktuelleEinsparungSourceV5[]
): SparzielAktuelleEinsparungV5[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: SparzielAktuelleEinsparungSourceV5
): SparzielAktuelleEinsparungV5 => ({
    id: getUuid(),
    date: record.Datum,
    differenzReferenzperiodeProzent: parseFloatOrNullForNA(
        record.Differenz_Referenzperiode_Prozent
    ),
    isEstimation: parseStringToBool(record.Differenz_Referenzperiode_Prozent_Schaetzung),
    differenzReferenzperiodeWitterungsbereinigtProzent: parseFloatOrNullForNA(record.Differenz_Referenzperiode_witterungsbereingt_Prozent),
    differenzReferenzperiodeWitterungsbereingtProzentSchaetzung: parseStringToBool(record.Differenz_Referenzperiode_witterungsbereingt_Prozent_Schaetzung),
    differenzReferenzperiodeWitterungsbereingtLowerBound: parseFloatOrNullForNA(record.Differenz_Referenzperiode_witterungsbereingt_lower_bound),
    differenzReferenzperiodeWitterungsbereingtUpperBound: parseFloatOrNullForNA(record.Differenz_Referenzperiode_witterungsbereingt_upper_bound),
    temperaturAbweichungNorm: parseFloatOrNullForNA(
        record.Temperatur_Abweichung_Norm
    )
});
