import { FiveYearWithDiffStatisticsModel } from '../base/statistics.model';
import { TrendModel } from '../base/trend.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromVerbrauchLandesverbrauchMitPrognoseSourceV2 {
    Datum: string;
    Landesverbrauch_GWh_SG: string;
    SG_5y_Min: string;
    SG_5y_Max: string;
    SG_5y_Mittelwert: string;
    Landesverbrauch_prognose_SG_GWh: string;
    MA_Trend: string;
    Trend: string;
    TrendRating: string;
    Differenz_Mittelwert_prozent: string;
    Differenz_min_prozent: string;
    Differenz_max_prozent: string;
}

export interface StromVerbrauchLandesverbrauchMitPrognoseV2
    extends BaseModel,
        DateModel,
        FiveYearWithDiffStatisticsModel,
        TrendModel {
    landesverbrauch: number | null;
    landesverbrauchPrognose: number | null;
    trendMovingAverage: number;
}

export const map = (
    records: StromVerbrauchLandesverbrauchMitPrognoseSourceV2[]
): StromVerbrauchLandesverbrauchMitPrognoseV2[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: StromVerbrauchLandesverbrauchMitPrognoseSourceV2
): StromVerbrauchLandesverbrauchMitPrognoseV2 => ({
    id: getUuid(),
    date: record.Datum,
    landesverbrauch: parseFloatOrNullForNA(record.Landesverbrauch_GWh_SG),
    landesverbrauchPrognose: parseFloatOrNullForNA(
        record.Landesverbrauch_prognose_SG_GWh
    ),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
    trendMovingAverage: parseFloatOrNullForNA(record.MA_Trend),
    fiveYearMin: parseFloat(record.SG_5y_Min),
    fiveYearMax: parseFloat(record.SG_5y_Max),
    fiveYearMittelwert: parseFloat(record.SG_5y_Mittelwert),
    differenzMittelwert: parseFloatOrNullForNA(
        record.Differenz_Mittelwert_prozent
    ),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min_prozent),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max_prozent)
});