import { DateModel } from '../models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '../models/base/statistics.model';
import { mapDateWithMonth } from '../utils/date.utils';
import { StromVerbrauchLandesverbrauch } from '/opt/nodejs/models/strom-verbrauch-landesverbrauch.model';

export interface StromVerbrauchLandesverbrauchApi
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    landesverbrauchSG: number | null;
    landesverbrauchBFE: number | null;
    landesverbrauchENTSOE: number | null;
}

export const mapToApiModel = (
    records: StromVerbrauchLandesverbrauch[]
): StromVerbrauchLandesverbrauchApi[] => {
    return records.map((record) => mapToApi(record));
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
    differenzMax
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
        differenzMax
    };
};
