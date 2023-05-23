import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/wetter-temperatur-prognose.api-model';
import { fetchAllWetterTemperaturPrognose } from '/opt/nodejs/db/wetter/wetter-temperatur-prognose.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllWetterTemperaturPrognose();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
