import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardGasApi } from '/opt/nodejs/api/dashboard/dashboard-gas.api-model';
import { findMostRecentFuellstandGasspeicherV2ForRegion } from '/opt/nodejs/db/fuellstand-gasspeicher-v2.db';
import { findMostRecentGasImportHistoricalValuesV2 } from '/opt/nodejs/db/gas-import-historical-values-v2.db';
import { fetchCurrentGasImportKarte } from '/opt/nodejs/db/gas-import-karte.db';
import { fetchGasSparzielZielV2 } from '/opt/nodejs/db/gas-sparziel-ziel-v2.db';
import { FuellstandGasspeicherRegionV2 } from '/opt/nodejs/models/gas-fuellstand-gasspeicher-v2.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForGasDashboard();

    console.log(`data for gas dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForGasDashboard = async (): Promise<DashboardGasApi> => {
    const aktuellerVerbrauch = await getAktuellerVerbrauch();
    const fuellstandNachbarlaender = await getFuellstandNachbarlaender();
    const nettoImport = await getNettoImport();
    const aktuelleGesamteinsparung = await getAktuelleGesamteinsparung();

    return {
        aktuellerVerbrauch,
        fuellstandNachbarlaender,
        nettoImport,
        aktuelleGesamteinsparung
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
        date: currentValue.datum
    };
};

const getAktuelleGesamteinsparung = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchGasSparzielZielV2();

    console.log(
        `getAktuelleGesamteinsparung, currentValue: ${JSON.stringify(
            currentValue
        )}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value:
            currentValue.standSparzielProzent +
            currentValue.standSparzielGeschaetztProzent,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};
