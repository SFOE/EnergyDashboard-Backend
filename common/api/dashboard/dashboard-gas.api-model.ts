import { DashboardEntryApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardGasApi {
    aktuellerVerbrauch: DashboardEntryApi;
    fuellstandNachbarlaender: DashboardEntryApi;
    nettoImport: DashboardEntryApi;
    aktuelleGesamteinsparung: DashboardEntryApi;
}
