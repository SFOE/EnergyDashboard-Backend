import { createResponse } from '/opt/nodejs/api/api-requests';
import {
    DashboardEntryApi,
    DashboardEntryWithoutTrendApi
} from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardStromApi } from '/opt/nodejs/api/dashboard/dashboard-strom.api-model';
import { fetchAllEntkoppelungEndenergieverbrauchBIP } from '/opt/nodejs/db/strom/strom-entkoppelung-endenergieverbrauch-bip.db';
import { findMostRecentStromFuellungsgradSpeicherseenV2ForRegion } from '/opt/nodejs/db/strom/strom-fuellungsgrad-speicherseen-v2.db';
import { findMostRecentStromImportExportUebersicht } from '/opt/nodejs/db/strom/strom-import-export-uebersicht.db';
import {
    fetchMostRecentStromKkwProduktionCh,
    fetchMostRecentStromKkwProduktionFr
} from '/opt/nodejs/db/strom/strom-kkw-produktion.db';
import { fetchMostRecentStromProduktionImportVerbrauch } from '/opt/nodejs/db/strom/strom-produktion-import-verbrauch.db';
import { fetchStromSparzielZielV5 } from '/opt/nodejs/db/strom/strom-sparziel-ziel-v5.db';
import { fetchAllStromVerbrauchEndverbrauchV2 } from '/opt/nodejs/db/strom/strom-verbrauch-endverbrauch-v2.db';
import { fetchStromVerbrauchLandesverbrauchMitPrognoseV2ByDate } from '/opt/nodejs/db/strom/strom-verbrauch-landesverbrauch-mit-prognose-v2.db';
import { StromFuellungsgradSpeicherseenRegionV2 } from '/opt/nodejs/models/strom/strom-fuellungsgrad-speicherseen-v2.model';
import { getYesterday } from '/opt/nodejs/utils/date.utils';
import { roundOneDecimal } from '/opt/nodejs/utils/number.utils';
import { fetchAllStromEnergieverbrauchBruttoenergieverbrauch } from '/opt/nodejs/db/strom/strom-energieverbrauch-bruttoenergieverbrauch';
import { fetchAllStromProduktionPv } from '/opt/nodejs/db/strom/strom-produktion-pv.db';
import { fetchAllStromProduktionPvTrend } from '/opt/nodejs/db/strom/strom-produktion-pv-trend.db';
import { fetchAllStromWinterproduktionImportExport } from '/opt/nodejs/db/strom/strom-winterproduktion-import-export.db';
import { fetchAllStromWinterproduktionTrend } from '/opt/nodejs/db/strom/strom-winterproduktion-trend.db';
import { fetchAllStromWinterproduktionEinzelneEnergietraeger } from '/opt/nodejs/db/strom/strom-winterproduktion-einzelne-energietraeger.db';

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
    const promiseEndenergieverbrauch = getEndenergieverbrauch();
    const promisePhotovoltaik = getProduktionPhotovoltaik();
    const promiseWinterproduktion = getProduktionWinterproduktion();

    const [
        aktuellerVerbrauch,
        gesamtProduktion,
        produktionKkwCH,
        produktionKkwFR,
        speicherfuellstand,
        { nettoImport, nettoExport, nettoImportExport },
        aktuelleGesamteinsparung,
        endenergieverbrauch,
        produktionPhotovoltaik,
        produktionWinterproduktion
    ] = await Promise.all([
        promiseAktuellerVerbrauch,
        promiseGesamtProduktion,
        promiseProduktionKkwCH,
        promiseProduktionKkwFR,
        promiseSpeicherfuellstand,
        promiseNettoImportAndExport,
        promiseAktuelleGesamteinsparung,
        promiseEndenergieverbrauch,
        promisePhotovoltaik,
        promiseWinterproduktion
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
        aktuelleGesamteinsparung,
        endenergieverbrauch,
        produktionPhotovoltaik,
        produktionWinterproduktion
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

const getEndenergieverbrauch = async (): Promise<DashboardEntryApi> => {
    const currentValue =
        await fetchAllStromEnergieverbrauchBruttoenergieverbrauch();

    console.log(
        `getEndenergieverbrauch, currentValue: ${JSON.stringify(currentValue)}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: null,
        trend: null,
        trendRating: null,
        date: currentValue[0].date
    };
};

const filterEntry = (entries) => {
    if (entries.length === 0) {
        return null;
    }

    return entries.reduce((newest, entry) => {
        return new Date(entry.date) > new Date(newest.date) ? entry : newest;
    });
};

const getProduktionPhotovoltaik = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchAllStromProduktionPv();
    const trend = await fetchAllStromProduktionPvTrend();

    console.log(
        `getProduktionPhotovoltaik, currentValue: ${JSON.stringify(
            currentValue
        )}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: Math.round(filterEntry(currentValue).stromProduktion),
        trend: filterEntry(trend).trend,
        trendRating: filterEntry(trend).trendRating,
        date: filterEntry(currentValue).date
    };
};

const getProduktionWinterproduktion = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchAllStromWinterproduktionImportExport();
    const trend = await fetchAllStromWinterproduktionTrend();

    console.log(
        `getProduktionWinterproduktion, currentValue: ${JSON.stringify(
            currentValue
        )}`
    );

    if (!currentValue) {
        return null;
    }

    return {
        value: Math.round(
            trend[0].importe > 0 ? trend[0].importe : trend[0].exporte
        ),
        trend: null,
        trendRating: null,
        date: filterEntry(currentValue).date
    };
};
