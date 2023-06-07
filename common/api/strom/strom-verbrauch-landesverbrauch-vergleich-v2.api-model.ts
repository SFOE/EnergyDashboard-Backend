import { DateModel } from '/opt/nodejs/models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '/opt/nodejs/models/base/statistics.model';
import {
    StromVerbrauchLandesverbrauchVergleichV2
} from '/opt/nodejs/models/strom/strom-verbrauch-landesverbrauch-vergleich-v2.model';

export interface StromVerbrauchLandesverbrauchVergleichApiV2
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    landesverbrauchSG: number | null;
    landesverbrauchBFE: number | null;
    landesverbrauchENTSOE: number | null;
}

export const mapToApiModel = (
    records: StromVerbrauchLandesverbrauchVergleichV2[]
): StromVerbrauchLandesverbrauchVergleichApiV2[] => {
    return records.map((record) => mapToApi(record));
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
                      differenzMax
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
        differenzMax
    };
};
