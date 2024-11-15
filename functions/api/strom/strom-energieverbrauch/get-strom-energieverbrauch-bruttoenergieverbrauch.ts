import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-energieverbrauch-bruttoenergieverbrauch.api-model';
import {
    fetchAllStromEnergieverbrauchBruttoenergieverbrauch
} from '/opt/nodejs/db/strom/strom-energieverbrauch-bruttoenergieverbrauch';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromEnergieverbrauchBruttoenergieverbrauch();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

