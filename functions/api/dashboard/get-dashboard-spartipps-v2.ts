import { fetchAllSpartippsV2 } from '/opt/nodejs/db/dashboard/spartipps-v2.db';
import { createResponse } from '/opt/nodejs/api/api-requests';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllSpartippsV2();

    console.log(`data for spartipps dashboard: ${JSON.stringify(data)}`);
    return createResponse(data);
};
