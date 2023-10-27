import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchGasSparzielZielV5 } from '/opt/nodejs/db/gas/gas-sparziel-ziel-v5.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchGasSparzielZielV5();

    return createResponse(data);
};
