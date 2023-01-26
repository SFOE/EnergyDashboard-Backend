import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter-temperatur-aktuell.model';
import { WetterTemperaturTrend } from '/opt/nodejs/models/wetter-temperatur-trend.model';

export interface WetterTemperaturTrendApi {
    trend: Trend;
    trendRating: TrendRating;
    values: {
        [station: string]: WetterTemperaturTrendEntryApi;
    }
}

interface WetterTemperaturTrendEntryApi {
    lufttemperaturTagesmittel: number;
    datum: string;
}

export const mapToApiModel = (temperaturTrend: WetterTemperaturTrend, records: WetterTemperaturAktuell[]): WetterTemperaturTrendApi => {
    const response = {
        trend: temperaturTrend.trend,
        trendRating: temperaturTrend.trendRating,
        values: {},
    };
    records.forEach(record => {
        response.values[record.station] = mapToApi(record);
    })

    return response;
};

const mapToApi = ({
    datum,
    lufttemperaturTagesmittel,
}: WetterTemperaturAktuell): WetterTemperaturTrendEntryApi => ({
    datum,
    lufttemperaturTagesmittel,
});
