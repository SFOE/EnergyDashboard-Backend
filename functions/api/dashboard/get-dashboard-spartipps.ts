import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllSpartipps } from '/opt/nodejs/db/spartipps.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllSpartipps();

    console.log(`data for spartipps dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};
