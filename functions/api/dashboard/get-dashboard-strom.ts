import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryApi, DashboardEntryWithoutTrendApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardStromApi } from '/opt/nodejs/api/dashboard/dashboard-strom.api-model';
import { findMostRecentStromFuellungsgradSpeicherseenV2ForRegion } from '/opt/nodejs/db/strom/strom-fuellungsgrad-speicherseen-v2.db';
import { findMostRecentStromImportExportUebersicht } from '/opt/nodejs/db/strom/strom-import-export-uebersicht.db';
import {
    fetchMostRecentStromKkwProduktionCh,
    fetchMostRecentStromKkwProduktionFr
} from '/opt/nodejs/db/strom/strom-kkw-produktion.db';
import { fetchMostRecentStromProduktionImportVerbrauch } from '/opt/nodejs/db/strom/strom-produktion-import-verbrauch.db';
import { fetchStromSparzielZielV5 } from '/opt/nodejs/db/strom/strom-sparziel-ziel-v5.db';
import { fetchStromVerbrauchLandesverbrauchMitPrognoseV2ByDate } from '/opt/nodejs/db/strom/strom-verbrauch-landesverbrauch-mit-prognose-v2.db';
import { StromFuellungsgradSpeicherseenRegionV2 } from '/opt/nodejs/models/strom/strom-fuellungsgrad-speicherseen-v2.model';
import { getYesterday } from '/opt/nodejs/utils/date.utils';
import { roundOneDecimal } from '/opt/nodejs/utils/number.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForStromDashboard();

    console.log(`data for strom dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForStromDashboard = async (): Promise<DashboardStromApi> => {
    const promiseAktuellerVerbrauch = getAktuellerVerbrauch();
    const promiseGesamtProduktion = getGesamtProduktion();
    const promiseProduktionKkwCH = getProduktionKkwCH();
    const promiseProduktionKkwFR = getProduktionKkwFR();
    const promiseSpeicherfuellstand = getSpeicherfuellstand();
    const promiseNettoImportAndExport = getNettoImportAndExport();
    const promiseAktuelleGesamteinsparung = getAktuelleGesamteinsparung();

    const [
        aktuellerVerbrauch,
        gesamtProduktion,
        produktionKkwCH,
        produktionKkwFR,
        speicherfuellstand,
        { nettoImport, nettoExport, nettoImportExport },
        aktuelleGesamteinsparung
    ] = await Promise.all([
        promiseAktuellerVerbrauch,
        promiseGesamtProduktion,
        promiseProduktionKkwCH,
        promiseProduktionKkwFR,
        promiseSpeicherfuellstand,
        promiseNettoImportAndExport,
        promiseAktuelleGesamteinsparung
    ]);

    return {
        aktuellerVerbrauch,
        gesamtProduktion,
        produktionKkwCH,
        produktionKkwFR,
        speicherfuellstand,
        nettoImport,
        nettoExport,
        nettoImportExport,
        aktuelleGesamteinsparung
    };
};

const getAktuellerVerbrauch = async (): Promise<DashboardEntryApi> => {
    console.log('getAktuellerVerbrauch');
    const yesterday = getYesterday();
    const currentValue =
        await fetchStromVerbrauchLandesverbrauchMitPrognoseV2ByDate(yesterday);
    console.log(
        `getAktuellerVerbrauch, currentValue: ${JSON.stringify(currentValue)}`
    );
    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.landesverbrauchPrognose,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};

const getGesamtProduktion = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchMostRecentStromProduktionImportVerbrauch();
    console.log(
        `getGesamtProduktion, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.eigenproduktion,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date
    };
};

const getProduktionKkwCH = async (): Promise<DashboardEntryWithoutTrendApi> => {
    const currentValue = await fetchMostRecentStromKkwProduktionCh();
    console.log(
        `getProduktionKkwCH, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.currentProduction,
        date: currentValue.date
    };
};

const getProduktionKkwFR = async (): Promise<DashboardEntryWithoutTrendApi> => {
    const currentValue = await fetchMostRecentStromKkwProduktionFr();
    console.log(
        `getProduktionKkwFR, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.currentProduction,
        date: currentValue.date
    };
};

const getSpeicherfuellstand = async (): Promise<DashboardEntryApi> => {
    console.log(`getSpeicherfuellstand`);

    const currentValue =
        await findMostRecentStromFuellungsgradSpeicherseenV2ForRegion(
            StromFuellungsgradSpeicherseenRegionV2.TotalCH
        );
    console.log(
        `getSpeicherfuellstand, currentValue: ${JSON.stringify(currentValue)}`
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

const getNettoImportAndExport = async (): Promise<{
    nettoImport: DashboardEntryApi;
    nettoExport: DashboardEntryApi;
    nettoImportExport: DashboardEntryApi;
}> => {
    console.log(`getNettoImport`);

    const currentValue = await findMostRecentStromImportExportUebersicht();
    console.log(
        `getNettoImport, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        nettoImport: {
            value: currentValue.importGWh,
            trend: currentValue.trendImport,
            trendRating: currentValue.trendRatingImport,
            date: currentValue.date
        },
        nettoExport: {
            value: currentValue.exportGWh,
            trend: currentValue.trendExport,
            trendRating: currentValue.trendRatingExport,
            date: currentValue.date
        },
        nettoImportExport: {
            value: currentValue.nettoimportGWh,
            trend: currentValue.trendNettoimport,
            trendRating: currentValue.trendRatingNettoimport,
            date: currentValue.date
        }
    };
};

const getAktuelleGesamteinsparung = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchStromSparzielZielV5();

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
