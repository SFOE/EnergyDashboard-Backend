import { DateModel } from '/opt/nodejs/models/base/date.model';
import { FiveYearStatisticsModel } from '/opt/nodejs/models/base/statistics.model';
import { WetterSchneereserven } from '/opt/nodejs/models/wetter/wetter-schneereserven.model';

export interface WetterSchneereservenApi extends DateModel, FiveYearStatisticsModel {
    aktuellMm: number;
}

export const mapToApiModel = (
    records: WetterSchneereserven[]
): WetterSchneereservenApi[] => {
    return records.map((record) => mapToApi(record));
};

const mapToApi = (record: WetterSchneereserven): WetterSchneereservenApi => ({
    date: record.date,
    fiveYearMin: record.fiveYearMin,
    fiveYearMittelwert: record.fiveYearMittelwert,
    fiveYearMax: record.fiveYearMax,
    aktuellMm: record.aktuellMm
});
