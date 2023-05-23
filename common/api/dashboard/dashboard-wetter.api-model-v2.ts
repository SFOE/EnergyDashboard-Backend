import {
    DashboardEntryApi,
    DashboardEntryWithoutDateApi,
    DashboardEntryWithoutTrendApi
} from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardWetterApiV2 {
    aktuelleTemperatur: DashboardEntryWithoutTrendApi;
    prognoseTemperatur: DashboardEntryWithoutDateApi;
    niederschlaege: DashboardEntryApi;
    schneereserven: DashboardEntryApi;
}
