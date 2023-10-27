import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/gas/gas-fuellstand-gasspeicher-v2.api-model';
import { fetchAllFuellstandGasspeicherV2 } from '/opt/nodejs/db/gas/gas-fuellstand-gasspeicher-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllFuellstandGasspeicherV2();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

