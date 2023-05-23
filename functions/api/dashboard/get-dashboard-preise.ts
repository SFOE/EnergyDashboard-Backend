import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryWithoutTrendApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardPreiseApi } from '/opt/nodejs/api/dashboard/dashboard-preise.api-model';
import { fetchCurrentPreiseHeizoelEntwicklung } from '/opt/nodejs/db/preise/preise-heizoel-entwicklung.db';
import { fetchCurrentPreiseStromBoerse } from '/opt/nodejs/db/preise/preise-strom-boerse.db';
import { fetchCurrentPreiseTreibstoffBleifrei } from '/opt/nodejs/db/preise/preise-treibstoff-bleifrei.db';
import { fetchCurrentPreiseTreibstoffDiesel } from '/opt/nodejs/db/preise/preise-treibstoff-diesel.db';
import { PreiseStromBoerse } from '/opt/nodejs/models/preise/preise-strom-boerse.model';
import { PreiseIndexiertType } from '/opt/nodejs/models/preise/preise.common.model';
import { fetchCurrentPreiseGasDayahead } from '/opt/nodejs/db/preise/preise-gas-dayahead.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForPreiseDashboard();

    console.log(`data for preise dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForPreiseDashboard = async (): Promise<DashboardPreiseApi> => {
    const promiseStromBoerse = fetchCurrentPreiseStromBoerse();
    const promiseGasBoerse = fetchCurrentPreiseGasDayahead();
    const promiseHeizoelEntwicklung = fetchCurrentPreiseHeizoelEntwicklung();
    const promiseTreibstoffBenzin = fetchCurrentPreiseTreibstoffBleifrei();
    const promiseTreibstoffDiesel = fetchCurrentPreiseTreibstoffDiesel();

    const [
        stromBoerse,
        gasBoerse,
        heizoelEntwicklung,
        treibstoffBenzin,
        treibstoffDiesel
    ] = await Promise.all([
        promiseStromBoerse,
        promiseGasBoerse,
        promiseHeizoelEntwicklung,
        promiseTreibstoffBenzin,
        promiseTreibstoffDiesel
    ]);

    return {
        stromBoerse: mapStromBoerse(stromBoerse),
        gasBoerse: map(gasBoerse),
        heizoelEntwicklung: map(heizoelEntwicklung),
        treibstoffBenzin: map(treibstoffBenzin),
        treibstoffDiesel: map(treibstoffDiesel)
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
