import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllPreiseStromEuropa } from '/opt/nodejs/db/preise/preise-strom-europa.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllPreiseStromEuropa();

    return createResponse(data);
};
