import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryApi, DashboardEntryWithoutTrendApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardPreiseApi } from '/opt/nodejs/api/dashboard/dashboard-preise.api-model';
import { fetchCurrentPreiseHeizoelEntwicklung } from '/opt/nodejs/db/preise/preise-heizoel-entwicklung.db';
import { fetchCurrentPreiseStromBoerse } from '/opt/nodejs/db/preise/preise-strom-boerse.db';
import { fetchCurrentPreiseTreibstoffBleifrei } from '/opt/nodejs/db/preise/preise-treibstoff-bleifrei.db';
import { fetchCurrentPreiseTreibstoffDiesel } from '/opt/nodejs/db/preise/preise-treibstoff-diesel.db';
import { PreiseStromBoerse } from '/opt/nodejs/models/preise/preise-strom-boerse.model';
import { PreiseIndexiertType } from '/opt/nodejs/models/preise/preise.common.model';
import { fetchCurrentPreiseGasDayahead } from '/opt/nodejs/db/preise/preise-gas-dayahead.db';
import { fetchCurrentPreiseFernwaermeEndverbrauch } from '/opt/nodejs/db/preise/preise-fernwaerme-endverbrauch.db';
import { fetchCurrentPreiseBrennholzEndverbrauch } from '/opt/nodejs/db/preise/preise-brennholz-endverbrauch.db';
import { fetchCurrentPreiseStromEuropaTrend } from '/opt/nodejs/db/preise/preise-strom-europa-trend.db';
import { PreiseStromEuropaTrend } from '/opt/nodejs/models/preise/preise-strom-europa-trend.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForPreiseDashboard();

    console.log(`data for preise dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForPreiseDashboard = async (): Promise<DashboardPreiseApi> => {
    const promiseStromBoerse = fetchCurrentPreiseStromBoerse();
    const promiseStrompreisKarteEuropa = fetchCurrentPreiseStromEuropaTrend();
    const promiseGasBoerse = fetchCurrentPreiseGasDayahead();
    const promiseHeizoelEntwicklung = fetchCurrentPreiseHeizoelEntwicklung();
    const promiseTreibstoffBenzin = fetchCurrentPreiseTreibstoffBleifrei();
    const promiseTreibstoffDiesel = fetchCurrentPreiseTreibstoffDiesel();
    const promiseBrennholzEndverbrauch = fetchCurrentPreiseBrennholzEndverbrauch();
    const promiseFernwaermeEndverbrauch = fetchCurrentPreiseFernwaermeEndverbrauch();

    const [
        stromBoerse,
        strompreisKarteEuropa,
        gasBoerse,
        heizoelEntwicklung,
        treibstoffBenzin,
        treibstoffDiesel,
        brennholzEndverbrauch,
        fernwaermeEndverbrauch
    ] = await Promise.all([
        promiseStromBoerse,
        promiseStrompreisKarteEuropa,
        promiseGasBoerse,
        promiseHeizoelEntwicklung,
        promiseTreibstoffBenzin,
        promiseTreibstoffDiesel,
        promiseBrennholzEndverbrauch,
        promiseFernwaermeEndverbrauch
    ]);

    return {
        stromBoerse: mapStromBoerse(stromBoerse),
        strompreisKarteEuropa: mapStrompreisKarteEuropa(strompreisKarteEuropa),
        gasBoerse: map(gasBoerse),
        heizoelEntwicklung: map(heizoelEntwicklung),
        treibstoffBenzin: map(treibstoffBenzin),
        treibstoffDiesel: map(treibstoffDiesel),
        brennholzEndverbrauch: map(brennholzEndverbrauch),
        fernwaermeEndverbrauch: map(fernwaermeEndverbrauch)
    };
};

const map = (entry: PreiseIndexiertType): DashboardEntryWithoutTrendApi => ({
    date: entry.date,
    value: entry.preisIndexiert
});

const mapStromBoerse = (
    entry: PreiseStromBoerse
): DashboardEntryWithoutTrendApi => ({
    date: entry.date,
    value: entry.preisEUR
});

const mapStrompreisKarteEuropa = (entry: PreiseStromEuropaTrend): DashboardEntryApi => ({
    date: entry.date,
    trend: entry.trend,
    trendRating: entry.rating,
    value: entry.value
});