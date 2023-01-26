import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/fuellstand-gasspeicher.api-model';
import { fetchAllFuellstandGasspeicher } from '/opt/nodejs/db/fuellstand-gasspeicher.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllFuellstandGasspeicher();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

