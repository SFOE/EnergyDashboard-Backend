import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchStromSparzielZielV5 } from '/opt/nodejs/db/strom/strom-sparziel-ziel-v5.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchStromSparzielZielV5();

    return createResponse(data);
};
