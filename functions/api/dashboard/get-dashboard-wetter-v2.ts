import { createResponse } from '/opt/nodejs/api/api-requests';
import {
    DashboardEntryApi,
    DashboardEntryWithoutDateApi,
    DashboardEntryWithoutTrendApi
} from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardWetterApiV2 } from '/opt/nodejs/api/dashboard/dashboard-wetter.api-model-v2';
import { fetchCurrentWetterHeizgradtageTrend } from '/opt/nodejs/db/wetter/wetter-heizgradtage-trend.db';
import { fetchMostRecentWetterNiederschlagV2 } from '/opt/nodejs/db/wetter/wetter-niederschlag-v2.db';
import { fetchMostRecentWetterSchneereserven } from '/opt/nodejs/db/wetter/wetter-schneereserven.db';
import { fetchMostRecentWetterTemperaturAktuellSchweiz } from '/opt/nodejs/db/wetter/wetter-temperatur-aktuell.db';
import { fetchWetterTemperaturTrendV2 } from '/opt/nodejs/db/wetter/wetter-temperatur-trend-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForWetterDashboard();

    console.log(`data for strom dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForWetterDashboard = async (): Promise<DashboardWetterApiV2> => {
    const promiseAktuelleTemperatur = getAktuelleTemperatur();
    const promisePrognoseTemperatur = getPrognoseTemperatur();
    const promiseSchneereserven = getSchneereserven();
    const promiseNiederschlaege = getNiederschlaege();
    const promiseHeizgradtage = getHeizgradtage();

    const [
        aktuelleTemperatur,
        prognoseTemperatur,
        schneereserven,
        niederschlaege,
        heizgradtage
    ] = await Promise.all([
        promiseAktuelleTemperatur,
        promisePrognoseTemperatur,
        promiseSchneereserven,
        promiseNiederschlaege,
        promiseHeizgradtage
    ]);

    return {
        aktuelleTemperatur,
        prognoseTemperatur,
        schneereserven,
        niederschlaege,
        heizgradtage
    };
};

const getAktuelleTemperatur =
    async (): Promise<DashboardEntryWithoutTrendApi> => {
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
    async (): Promise<DashboardEntryWithoutDateApi> => {
        const trend = await fetchWetterTemperaturTrendV2();
        console.log(
            `getPrognoseTemperatur, prognoseTemperatur: ${JSON.stringify(
                trend
            )}`
        );

        if (!trend) {
            return null;
        }

        return {
            trend: trend.trend,
            trendRating: trend.trendRating,
            value: trend.averageTemperature
        };
    };

const getNiederschlaege = async (): Promise<DashboardEntryApi> => {
    const niederschlaege = await fetchMostRecentWetterNiederschlagV2();

    console.log(
        `getNiederschlag, niederschlaege: ${JSON.stringify(niederschlaege)}`
    );

    if (!niederschlaege) {
        return null;
    }

    return {
        trend: niederschlaege.trend,
        trendRating: niederschlaege.trendRating,
        value: niederschlaege.niederschlagGemessen,
        date: niederschlaege.date
    };
};

const getSchneereserven = async (): Promise<DashboardEntryApi> => {
    const schneereserven = await fetchMostRecentWetterSchneereserven();

    console.log(
        `getSchneereserven, schneerserven: ${JSON.stringify(schneereserven)}`
    );

    if (!schneereserven) {
        return null;
    }

    return {
        value: schneereserven.aktuellMm,
        date: schneereserven.date,
        trend: schneereserven.trend,
        trendRating: schneereserven.trendRating
    };
};

const getHeizgradtage = async (): Promise<DashboardEntryApi> => {
    const hgtTrend = await fetchCurrentWetterHeizgradtageTrend();
    console.log(`getHeizgradtage, heizgradtage: ${JSON.stringify(hgtTrend)}`);

    if (!hgtTrend) {
        return null;
    }

    return {
        value: hgtTrend.messungPrognoseKumulativMittelwert,
        date: hgtTrend.date,
        trend: hgtTrend.trend,
        trendRating: hgtTrend.rating
    };
};
