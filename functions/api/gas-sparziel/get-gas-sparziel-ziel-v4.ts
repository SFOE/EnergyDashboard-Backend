import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel/sparziel-ziel-v4.api-model';
import { fetchGasSparzielZielV4 } from '/opt/nodejs/db/gas/gas-sparziel-ziel-v4.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchGasSparzielZielV4();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

