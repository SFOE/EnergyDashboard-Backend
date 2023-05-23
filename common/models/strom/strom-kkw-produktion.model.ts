import { BaseModel } from '../base/base.model';
import { FiveYearStatisticsModel } from '../base/statistics.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromKkwProduktionSourceV1 {
    Kategorie: string;
    Datum: string;
    '5y_Min': string;
    '5y_Max': string;
    '5y_Mittelwert': string;
    Differenz_Min: string;
    Differenz_Max: string;
    Trend?: string;
    TrendRating?: string;
}

export interface StromKkwProduktionV1
    extends BaseModel,
        DateModel,
        FiveYearStatisticsModel {
    currentProduction?: number;
}

export const mapRecord = (
    record: StromKkwProduktionSourceV1
): StromKkwProduktionV1 => ({
    id: getUuid(),
    date: record.Datum,
    fiveYearMin: parseFloatOrNullForNA(record['5y_Min']),
    fiveYearMax: parseFloatOrNullForNA(record['5y_Max']),
    fiveYearMittelwert: parseFloatOrNullForNA(record['5y_Mittelwert'])
});
