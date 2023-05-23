import { FiveYearWithDiffStatisticsModel } from './base/statistics.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromVerbrauchLandesverbrauchVergleichSourceV2 {
    Datum: string;
    Landesverbrauch_GWh_SG: string;
    Landesverbrauch_mit_Speicherpumpen_GWh_BFE: string;
    Landesverbrauch_GWh_entsoe: string;
    BFE_5y_Min: string;
    BFE_5y_Max: string;
    BFE_5y_Mittelwert: string;
    Differenz_Mittelwert_BFE_prozent: string;
    Differenz_min_BFE_prozent: string;
    Differenz_max_BFE_prozent: string;
}

export interface StromVerbrauchLandesverbrauchVergleichV2
    extends BaseModel,
        DateModel,
        FiveYearWithDiffStatisticsModel {
    landesverbrauchSG: number | null;
    landesverbrauchBFE: number | null;
    landesverbrauchENTSOE: number | null;
}

export const map = (
    records: StromVerbrauchLandesverbrauchVergleichSourceV2[]
): StromVerbrauchLandesverbrauchVergleichV2[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: StromVerbrauchLandesverbrauchVergleichSourceV2
): StromVerbrauchLandesverbrauchVergleichV2 => ({
    id: createId(record.Datum),
    date: record.Datum,
    landesverbrauchSG: parseFloatOrNullForNA(record.Landesverbrauch_GWh_SG),
    landesverbrauchBFE: parseFloatOrNullForNA(
        record.Landesverbrauch_mit_Speicherpumpen_GWh_BFE
    ),
    landesverbrauchENTSOE: parseFloatOrNullForNA(
        record.Landesverbrauch_GWh_entsoe
    ),
    fiveYearMin: parseFloat(record.BFE_5y_Min),
    fiveYearMax: parseFloat(record.BFE_5y_Max),
    fiveYearMittelwert: parseFloat(record.BFE_5y_Mittelwert),
    differenzMittelwert: parseFloatOrNullForNA(
        record.Differenz_Mittelwert_BFE_prozent
    ),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min_BFE_prozent),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max_BFE_prozent)
});

export const createId = (date: string) => {
    return `landesverbrauch-vergleich-v2-${date}`;
};
