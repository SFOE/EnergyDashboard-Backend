import { FiveYearWithDiffStatisticsModel } from '../base/statistics.model';
import { TrendModel } from '../base/trend.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface GasImportHistoricalValueSourceV2 {
    Importierte_Energie_GWh: string;
    '5y_Min': string;
    '5y_Max': string;
    '5y_Mittelwert': string;
    Datum: string;
    Differenz_Mittelwert: string;
    Differenz_Min: string;
    Differenz_Max: string;
    Trend: string;
    TrendRating: string;
}

export interface GasImportHistoricalValueV2
    extends BaseModel,
        DateModel,
        TrendModel,
        FiveYearWithDiffStatisticsModel {
    nettoimport: number | null;
}

export const map = (
    records: GasImportHistoricalValueSourceV2[]
): GasImportHistoricalValueV2[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: GasImportHistoricalValueSourceV2
): GasImportHistoricalValueV2 => ({
    id: getUuid(),
    date: record.Datum,
    nettoimport: parseFloatOrNullForNA(record.Importierte_Energie_GWh),
    fiveYearMin: parseFloat(record['5y_Min']),
    fiveYearMax: parseFloat(record['5y_Max']),
    fiveYearMittelwert: parseFloat(record['5y_Mittelwert']),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert),
    differenzMin: parseFloatOrNullForNA(record.Differenz_Min),
    differenzMax: parseFloatOrNullForNA(record.Differenz_Max),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating]
});
