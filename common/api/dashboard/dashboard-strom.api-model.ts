import {
    DashboardEntryApi,
    DashboardEntryWithoutTrendApi
} from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardStromApi {
    aktuellerVerbrauch: DashboardEntryApi;
    gesamtProduktion: DashboardEntryApi;
    produktionKkwCH: DashboardEntryWithoutTrendApi;
    produktionKkwFR: DashboardEntryWithoutTrendApi;
    speicherfuellstand: DashboardEntryApi;
    nettoImport: DashboardEntryApi;
    nettoExport: DashboardEntryApi;
    nettoImportExport: DashboardEntryApi;
    aktuelleGesamteinsparung: DashboardEntryApi;
    endenergieverbrauch: DashboardEntryApi;
    produktionPhotovoltaik: DashboardEntryApi;
    produktionWinterproduktion: DashboardEntryApi;
}
