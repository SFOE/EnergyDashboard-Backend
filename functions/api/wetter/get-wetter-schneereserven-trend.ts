import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchMostRecentWetterSchneereserven } from '/opt/nodejs/db/wetter/wetter-schneereserven.db';
import { mapToApiModel } from '/opt/nodejs/api/wetter/wetter-schneereserven-trend.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchMostRecentWetterSchneereserven();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};