import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchMostRecentStromProduktionPvTrend } from '/opt/nodejs/db/strom/strom-produktion-pv-trend.db';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-produktion-pv-trend.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchMostRecentStromProduktionPvTrend();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
