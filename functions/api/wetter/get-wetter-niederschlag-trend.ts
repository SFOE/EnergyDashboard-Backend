import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchMostRecentWetterNiederschlag } from '/opt/nodejs/db/wetter/wetter-niederschlag.db';
import { mapToApiModel } from '/opt/nodejs/api/wetter-niederschlag-trend.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchMostRecentWetterNiederschlag();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};