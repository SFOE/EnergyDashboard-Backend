import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardStromApi } from '/opt/nodejs/api/dashboard/dashboard-strom.api-model';
import {
    findMostRecentStromFuellungsgradSpeicherseenV2ForRegion,
} from '/opt/nodejs/db/strom-fuellungsgrad-speicherseen-v2.db';
import { findMostRecentStromImportExportUebersicht } from '/opt/nodejs/db/strom-import-export-uebersicht.db';
import { fetchMostRecentStromProduktionImportVerbrauch } from '/opt/nodejs/db/strom-produktion-import-verbrauch.db';
import { fetchStromSparzielZiel } from '/opt/nodejs/db/strom-sparziel-ziel.db';
import {
    findStromVerbrauchLandesverbrauchMitPrognoseV2ByDate,
} from '/opt/nodejs/db/strom-verbrauch-landesverbrauch-mit-prognose-v2.db';
import { Region } from '/opt/nodejs/models/fuellungsgrad-speicherseen.model';
import { getYesterdaysDateAsIsoString } from '/opt/nodejs/utils/date.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForStromDashboard();

    console.log(`data for strom dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForStromDashboard = async (): Promise<DashboardStromApi> => {
    const aktuellerVerbrauch = await getAktuellerVerbrauch();
    const gesamtProduktion = await getGesamtProduktion();
    const speicherfuellstand = await getSpeicherfuellstand();
    const { nettoImport, nettoExport } = await getNettoImportAndExport();
    const aktuelleGesamteinsparung = await getAktuelleGesamteinsparung();

    return {
        aktuellerVerbrauch,
        gesamtProduktion,
        speicherfuellstand,
        nettoImport,
        nettoExport,
        aktuelleGesamteinsparung
    };
}

const getAktuellerVerbrauch = async (): Promise<DashboardEntryApi> => {
    const yesterday = getYesterdaysDateAsIsoString();
    console.log(`getAktuellerVerbrauch,  day: ${yesterday}`);

    const currentValue = await findStromVerbrauchLandesverbrauchMitPrognoseV2ByDate(yesterday);
    console.log(`getAktuellerVerbrauch, currentValue: ${JSON.stringify(currentValue)}`);
    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.landesverbrauchPrognose,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date,

    }
}

const getGesamtProduktion = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchMostRecentStromProduktionImportVerbrauch();
    console.log(`getGesamtProduktion, currentValue: ${JSON.stringify(currentValue)}`);

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.eigenproduktion,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.datum,
    }
}

const getSpeicherfuellstand = async (): Promise<DashboardEntryApi> => {
    console.log(`getSpeicherfuellstand`);

    const currentValue = await findMostRecentStromFuellungsgradSpeicherseenV2ForRegion(Region.TotalCH);
    console.log(`getSpeicherfuellstand, currentValue: ${JSON.stringify(currentValue)}`);

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.speicherstandProzent,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date,
    }
}

const getNettoImportAndExport = async (): Promise<{ nettoImport: DashboardEntryApi, nettoExport: DashboardEntryApi }> => {
    console.log(`getNettoImport`);

    const currentValue = await findMostRecentStromImportExportUebersicht();
    console.log(`getNettoImport, currentValue: ${JSON.stringify(currentValue)}`);

    if (!currentValue) {
        return null;
    }

    return {
        nettoImport: {
            value: currentValue.importGWh,
            trend: currentValue.trendImport,
            trendRating: currentValue.trendRatingImport,
            date: currentValue.datum,
        },
        nettoExport: {
            value: currentValue.exportGWh,
            trend: currentValue.trendExport,
            trendRating: currentValue.trendRatingExport,
            date: currentValue.datum,
        },

    }
}


const getAktuelleGesamteinsparung = async (): Promise<DashboardEntryApi> => {
    const currentValue = await fetchStromSparzielZiel();

    console.log(`getAktuelleGesamteinsparung, currentValue: ${JSON.stringify(currentValue)}`);

    if (!currentValue) {
        return null;
    }

    return {
        value: currentValue.standSparzielProzent + currentValue.standSparzielGeschaetztProzent,
        trend: currentValue.trend,
        trendRating: currentValue.trendRating,
        date: currentValue.date,
    };
}
