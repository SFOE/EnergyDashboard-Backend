import { DashboardEntryWithoutTrendApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardPreiseApi {
    stromBoerse: DashboardEntryWithoutTrendApi;
    gasBoerse: DashboardEntryWithoutTrendApi;
    heizoelEntwicklung: DashboardEntryWithoutTrendApi;
    treibstoffBenzin: DashboardEntryWithoutTrendApi;
    treibstoffDiesel: DashboardEntryWithoutTrendApi;
}
