import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/wetter-temperatur-aktuell.api-model';
import { fetchAllWetterTemperaturAktuell } from '/opt/nodejs/db/wetter-temperatur-aktuell.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllWetterTemperaturAktuell();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
