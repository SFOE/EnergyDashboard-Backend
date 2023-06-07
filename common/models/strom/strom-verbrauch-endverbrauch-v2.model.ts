import { FiveYearWithDiffStatisticsModel } from '../base/statistics.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromVerbrauchEndverbrauchSourceV2 {
    Datum: string;
    endverbrauch_GWh_SG: string;
    SG_5y_Min: string;
    SG_5y_Max: string;
    SG_5y_Mittelwert: string;
    Differenz_Mittelwert_prozent: string;
    Differenz_min_prozent: string;
    Differenz_max_prozent: string;
    Prognose_Mittel_GWh: string;
    Prognose_Min_GWh: string;
    Prognose_Max_GWh: string;
}

export interface StromVerbrauchEndverbrauchV2
    extends BaseModel,
        DateModel,
        FiveYearWithDiffStatisticsModel {
    endverbrauch: number | null;
    prognoseMittelwert: number | null;
    prognoseMin: number | null;
    prognoseMax: number | null;
}

export const map = (
    records: StromVerbrauchEndverbrauchSourceV2[]
): StromVerbrauchEndverbrauchV2[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: StromVerbrauchEndverbrauchSourceV2
): StromVerbrauchEndverbrauchV2 => ({
    id: getUuid(),
    date: record.Datum,
    endverbrauch: parseFloatOrNullForNA(record.endverbrauch_GWh_SG),
    fiveYearMin: parseFloat(record.SG_5y_Min),
    fiveYearMax: parseFloat(record.SG_5y_Max),
    fiveYearMittelwert: parseFloat(record.SG_5y_Mittelwert),
    differenzMittelwert: parseFloatOrNullForNA(
        record.Differenz_Mittelwert_prozent
    ),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min_prozent),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max_prozent),
    prognoseMittelwert: parseFloatOrNullForNA(record.Prognose_Mittel_GWh),
    prognoseMin: parseFloatOrNullForNA(record.Prognose_Min_GWh),
    prognoseMax: parseFloatOrNullForNA(record.Prognose_Max_GWh)
});
