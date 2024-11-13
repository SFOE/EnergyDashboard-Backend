import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchMostRecentStromWinterproduktionTrend } from '/opt/nodejs/db/strom/strom-winterproduktion-trend.db';
import {
    mapToApiModel,
    StromWinterproduktionTrendApi
} from '/opt/nodejs/api/strom/strom-winterproduktion-trend.api-model';
import { StromWinterproduktionTrend } from '/opt/nodejs/models/strom/strom-winterproduktion-trend.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data: StromWinterproduktionTrend =
        await fetchMostRecentStromWinterproduktionTrend();
    const mappedData: StromWinterproduktionTrendApi = mapToApiModel(data);

    return createResponse(mappedData);
};
