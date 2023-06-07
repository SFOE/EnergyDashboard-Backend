import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchWetterNiederschlagBilderDaten } from '/opt/nodejs/db/wetter/wetter-niederschlag-bilder-daten.db';
import { mapToApiModel } from '/opt/nodejs/api/wetter/wetter-niederschlag-bilder-daten.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchWetterNiederschlagBilderDaten();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};