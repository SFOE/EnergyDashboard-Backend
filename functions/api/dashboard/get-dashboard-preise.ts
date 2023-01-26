import { createResponse } from '/opt/nodejs/api/api-requests';
import { DashboardEntryWithoutTrendApi } from '/opt/nodejs/api/dashboard/dashboard-entry.api-model';
import { DashboardPreiseApi } from '/opt/nodejs/api/dashboard/dashboard-preise.api-model';
import { fetchCurrentPreiseGasBoerse } from '/opt/nodejs/db/preise/preise-gas-boerse.db';
import { fetchCurrentPreiseHeizoelEntwicklung } from '/opt/nodejs/db/preise/preise-heizoel-entwicklung.db';
import { fetchCurrentPreiseStromBoerse } from '/opt/nodejs/db/preise/preise-strom-boerse.db';
import { fetchCurrentPreiseTreibstoffBleifrei } from '/opt/nodejs/db/preise/preise-treibstoff-bleifrei.db';
import { fetchCurrentPreiseTreibstoffDiesel } from '/opt/nodejs/db/preise/preise-treibstoff-diesel.db';
import { PreiseStromBoerse } from '/opt/nodejs/models/preise/preise-strom-boerse.model';
import { PreiseIndexiertType } from '/opt/nodejs/models/preise/preise.common.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getDataForPreiseDashboard();

    console.log(`data for preise dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};

const getDataForPreiseDashboard = async (): Promise<DashboardPreiseApi> => {
    const stromBoerse = await fetchCurrentPreiseStromBoerse();
    const gasBoerse = await fetchCurrentPreiseGasBoerse();
    const heizoelEntwicklung = await fetchCurrentPreiseHeizoelEntwicklung();
    const treibstoffBenzin = await fetchCurrentPreiseTreibstoffBleifrei();
    const treibstoffDiesel = await fetchCurrentPreiseTreibstoffDiesel();

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
