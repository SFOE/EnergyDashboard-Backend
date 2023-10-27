import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardGasApi } from '/opt/nodejs/api/dashboard/dashboard-gas.api-model';
import { findMostRecentFuellstandGasspeicherV2ForRegion } from '/opt/nodejs/db/gas/gas-fuellstand-gasspeicher-v2.db';
import { fetchCurrentGasImportEuropaTrend } from '/opt/nodejs/db/gas/gas-import-europa-trend.db';
import { findMostRecentGasImportHistoricalValuesV2 } from '/opt/nodejs/db/gas/gas-import-historical-values-v2.db';
import { fetchCurrentGasImportKarte } from '/opt/nodejs/db/gas/gas-import-karte.db';
import { fetchGasSparzielZielV5 } from '/opt/nodejs/db/gas/gas-sparziel-ziel-v5.db';
import { FuellstandGasspeicherRegionV2 } from '/opt/nodejs/models/gas/gas-fuellstand-gasspeicher-v2.model';
import { roundOneDecimal } from '/opt/nodejs/utils/number.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForGasDashboard();

    console.log(`data for gas dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForGasDashboard = async (): Promise<DashboardGasApi> => {
    const promiseAktuellerVerbrauch = getAktuellerVerbrauch();
    const promiseFuellstandNachbarlaender = getFuellstandNachbarlaender();
    const promiseNettoImport = getNettoImport();
    const promiseAktuelleGesamteinsparung = getAktuelleGesamteinsparung();
    const promiseImportEuropa = getImportEuropa();

    const [
        aktuellerVerbrauch,
        fuellstandNachbarlaender,
        nettoImport,
        aktuelleGesamteinsparung,
        importEuropa
    ] = await Promise.all([
        promiseAktuellerVerbrauch,
        promiseFuellstandNachbarlaender,
        promiseNettoImport,
        promiseAktuelleGesamteinsparung,
        promiseImportEuropa
    ]);

    return {
        aktuellerVerbrauch,
        fuellstandNachbarlaender,
        nettoImport,
        aktuelleGesamteinsparung,
        importEuropa
    };
};

const getAktuellerVerbrauch = async (): Promise<DashboardEntryApi> => {
    console.log('getAktuellerVerbrauch');

    const currentValue = await findMostRecentGasImportHistoricalValuesV2();

    console.log(
        `getAktuellerVerbrauch, currentValue: ${JSON.stringify(currentValue)}`
    );
    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.nettoimport,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};

const getFuellstandNachbarlaender = async (): Promise<DashboardEntryApi> => {
    console.log(`getFuellstandNachbarlaender`);

    const currentValue = await findMostRecentFuellstandGasspeicherV2ForRegion(
        FuellstandGasspeicherRegionV2.EU
    );
    console.log(
        `getFuellstandNachbarlaender, currentValue: ${JSON.stringify(
            currentValue
        )}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.speicherstandProzent,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};

const getNettoImport = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchCurrentGasImportKarte();

    console.log(
        `getNettoImport, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.nettoImportCH,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};

const getAktuelleGesamteinsparung = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchGasSparzielZielV5();

    console.log(
        `getAktuelleGesamteinsparung, currentValue: ${JSON.stringify(
            currentValue
        )}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: roundOneDecimal(currentValue.kumulierteEinsparungProzent),
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};

const getImportEuropa = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchCurrentGasImportEuropaTrend();
    console.log(
        `getImportEuropa, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.value,
        trend: currentValue.trend,
        trendRating: currentValue.rating,
        date: currentValue.date
    };
};
