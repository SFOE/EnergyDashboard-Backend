import { StromVerbrauchLandesverbrauch } from '/opt/nodejs/models/strom-verbrauch-landesverbrauch.model';
import { mapDateWithMonth } from '../utils/date.utils';

export interface StromVerbrauchLandesverbrauchApi {
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

export const mapToApiModel = (records: StromVerbrauchLandesverbrauch[]): StromVerbrauchLandesverbrauchApi[] => {
    return records.map(record => mapToApi(record));
};

const mapToApi = ({
    monat,
    landesverbrauchSG,
    landesverbrauchBFE,
    landesverbrauchENTSOE,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax,
}: StromVerbrauchLandesverbrauch): StromVerbrauchLandesverbrauchApi => {
    return {
        landesverbrauchSG,
        landesverbrauchBFE,
        landesverbrauchENTSOE,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date: mapDateWithMonth(monat),
        differenzMittelwert,
        differenzMin,
        differenzMax,
    }
}
