import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/wetter/wetter-niederschlag-trend-v2.api-model';
import { fetchMostRecentWetterNiederschlagV2 } from '/opt/nodejs/db/wetter/wetter-niederschlag-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchMostRecentWetterNiederschlagV2();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};