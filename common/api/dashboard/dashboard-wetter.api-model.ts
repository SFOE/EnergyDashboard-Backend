import {
    DashboardEntryWithoutTrendApi,
    DashboardTrendEntryApi,
} from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardWetterApi {
    aktuelleTemperatur: DashboardEntryWithoutTrendApi;
    prognoseTemperatur: DashboardEntryWithoutTrendApi;
    trend: DashboardTrendEntryApi;
}
