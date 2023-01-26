import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel-ziel.api-model';
import { fetchGasSparzielZielV2 } from '/opt/nodejs/db/gas-sparziel-ziel-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchGasSparzielZielV2();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

