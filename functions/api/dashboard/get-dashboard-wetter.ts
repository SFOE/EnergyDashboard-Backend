import { createResponse } from '/opt/nodejs/api/api-requests';
import {
    DashboardEntryWithoutTrendApi,
    DashboardTrendEntryApi
} from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardWetterApi } from '/opt/nodejs/api/dashboard/dashboard-wetter.api-model';
import { fetchMostRecentWetterTemperaturAktuellSchweiz } from '/opt/nodejs/db/wetter/wetter-temperatur-aktuell.db';
import { fetchMostRecentWetterTemperaturPrognoseSchweiz } from '/opt/nodejs/db/wetter/wetter-temperatur-prognose.db';
import { fetchWetterTemperaturTrendV2 } from '/opt/nodejs/db/wetter/wetter-temperatur-trend-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForWetterDashboard();

    console.log(`data for strom dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForWetterDashboard = async (): Promise<DashboardWetterApi> => {
    const aktuelleTemperatur = await getAktuelleTemperatur();
    const prognoseTemperatur = await getPrognoseTemperatur();
    const trend = await getTrend();

    return {
        aktuelleTemperatur,
        prognoseTemperatur,
        trend
    };
};

const getAktuelleTemperatur =
    async (): Promise<DashboardEntryWithoutTrendApi> => {
        console.log(`getAktuelleTemperatur`);

        const currentValue =
            await fetchMostRecentWetterTemperaturAktuellSchweiz();
        console.log(
            `getAktuelleTemperatur, currentValue: ${JSON.stringify(
                currentValue
            )}`
        );
        if (!currentValue) {
            return null;
        }

        return {
            value: currentValue.lufttemperaturTagesmittel,
            date: currentValue.date
        };
    };

const getPrognoseTemperatur =
    async (): Promise<DashboardEntryWithoutTrendApi> => {
        console.log(`getAktuellePrognose`);

        const currentValue =
            await fetchMostRecentWetterTemperaturPrognoseSchweiz();
        console.log(
            `getAktuellePrognose, currentValue: ${JSON.stringify(currentValue)}`
        );
        if (!currentValue) {
            return null;
        }

        return {
            value: currentValue.lufttemperaturPrognose,
            date: currentValue.date
        };
    };

const getTrend = async (): Promise<DashboardTrendEntryApi> => {
    console.log(`getTrend`);

    const trend = await fetchWetterTemperaturTrendV2();
    console.log(`getTrend, trend: ${JSON.stringify(trend)}`);

    if (!trend) {
        return null;
    }

    return {
        trend: trend.trend,
        trendRating: trend.trendRating
    };
};
