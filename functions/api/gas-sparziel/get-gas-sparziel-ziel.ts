import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/gas-sparziel-ziel.api-model';
import { fetchGasSparzielZiel } from '/opt/nodejs/db/gas-sparziel-ziel.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchGasSparzielZiel();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

