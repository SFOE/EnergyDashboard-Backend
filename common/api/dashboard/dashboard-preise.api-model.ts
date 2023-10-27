import { DashboardEntryApi, DashboardEntryWithoutTrendApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';

export interface DashboardPreiseApi {
    stromBoerse: DashboardEntryWithoutTrendApi;
    strompreisKarteEuropa: DashboardEntryApi;
    gasBoerse: DashboardEntryWithoutTrendApi;
    heizoelEntwicklung: DashboardEntryWithoutTrendApi;
    treibstoffBenzin: DashboardEntryWithoutTrendApi;
    treibstoffDiesel: DashboardEntryWithoutTrendApi;
    brennholzEndverbrauch: DashboardEntryWithoutTrendApi;
    fernwaermeEndverbrauch: DashboardEntryWithoutTrendApi;
}
