import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromVerbrauchLandesverbrauchSource {
    Monat: string;
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

export interface StromVerbrauchLandesverbrauch {
    monat: number;
    landesverbrauchSG: number | null;
    landesverbrauchBFE: number | null;
    landesverbrauchENTSOE: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const map = (records: StromVerbrauchLandesverbrauchSource[]): StromVerbrauchLandesverbrauch[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromVerbrauchLandesverbrauchSource): StromVerbrauchLandesverbrauch => ({
    monat: parseInt(record.Monat),
    landesverbrauchSG: parseFloatOrNullForNA(record.Landesverbrauch_GWh_SG),
    landesverbrauchBFE: parseFloatOrNullForNA(record.Landesverbrauch_mit_Speicherpumpen_GWh_BFE),
    landesverbrauchENTSOE: parseFloatOrNullForNA(record.Landesverbrauch_GWh_entsoe),
    fiveYearMin: parseFloat(record.BFE_5y_Min),
    fiveYearMax: parseFloat(record.BFE_5y_Max),
    fiveYearMittelwert: parseFloat(record.BFE_5y_Mittelwert),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert_BFE_prozent),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min_BFE_prozent),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max_BFE_prozent),
})
