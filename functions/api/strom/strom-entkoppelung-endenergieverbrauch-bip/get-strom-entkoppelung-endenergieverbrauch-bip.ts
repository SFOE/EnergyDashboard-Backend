import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-entkoppelung-endenergieverbrauch-bip.api-model';
import { fetchAllEntkoppelungEndenergieverbrauchBIP } from '/opt/nodejs/db/strom/strom-entkoppelung-endenergieverbrauch-bip.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllEntkoppelungEndenergieverbrauchBIP();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};
