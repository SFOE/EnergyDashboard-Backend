import { DateModel } from '/opt/nodejs/models/base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter/wetter-temperatur-aktuell.model';
import { WetterTemperaturTrendV2 } from '/opt/nodejs/models/wetter/wetter-temperatur-trend-v2.model';

export interface WetterTemperaturTrendV2Api {
    trend: Trend;
    trendRating: TrendRating;
    values: {
        [station: string]: WetterTemperaturTrendEntryV2Api;
    };
}

interface WetterTemperaturTrendEntryV2Api extends DateModel {
    lufttemperaturTagesmittel: number;
}

export const mapToApiModel = (
    temperaturTrend: WetterTemperaturTrendV2,
    records: WetterTemperaturAktuell[]
): WetterTemperaturTrendV2Api => {
    const response = {
        trend: temperaturTrend.trend,
        trendRating: temperaturTrend.trendRating,
        values: {}
    };
    records.forEach((record) => {
        response.values[record.station] = mapToApi(record);
    });

    return response;
};

const mapToApi = ({
                      date,
                      lufttemperaturTagesmittel
                  }: WetterTemperaturAktuell): WetterTemperaturTrendEntryV2Api => ({
    date,
    lufttemperaturTagesmittel
});
