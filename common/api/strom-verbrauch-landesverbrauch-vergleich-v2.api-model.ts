import {
    StromVerbrauchLandesverbrauchVergleichV2,
} from '/opt/nodejs/models/strom-verbrauch-landesverbrauch-vergleich-v2.model';

export interface StromVerbrauchLandesverbrauchVergleichApiV2 {
    landesverbrauchSG: number | null;
    landesverbrauchBFE: number | null;
    landesverbrauchENTSOE: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: StromVerbrauchLandesverbrauchVergleichV2[]): StromVerbrauchLandesverbrauchVergleichApiV2[] => {
    return records.map(record => mapToApi(record));
};

const mapToApi = ({
    date,
    landesverbrauchSG,
    landesverbrauchBFE,
    landesverbrauchENTSOE,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax,
}: StromVerbrauchLandesverbrauchVergleichV2): StromVerbrauchLandesverbrauchVergleichApiV2 => {
    return {
        landesverbrauchSG,
        landesverbrauchBFE,
        landesverbrauchENTSOE,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date,
        differenzMittelwert,
        differenzMin,
        differenzMax,
    }
}
