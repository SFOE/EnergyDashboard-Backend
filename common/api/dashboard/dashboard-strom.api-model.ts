import { DashboardEntryApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardStromApi {
    aktuellerVerbrauch: DashboardEntryApi;
    gesamtProduktion: DashboardEntryApi;
    speicherfuellstand: DashboardEntryApi;
    nettoImport: DashboardEntryApi;
    nettoExport: DashboardEntryApi;
    aktuelleGesamteinsparung: DashboardEntryApi;
}
