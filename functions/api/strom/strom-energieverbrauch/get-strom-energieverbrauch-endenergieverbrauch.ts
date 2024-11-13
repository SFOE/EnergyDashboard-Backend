import { createResponse } from '/opt/nodejs/api/api-requests';
import {
    mapToApiModel,
    StromEnergieverbrauchEndenergieverbrauchApi
} from '/opt/nodejs/api/strom/strom-energieverbrauch-endenergieverbrauch.api-model';
import { fetchAllStromEnergieverbrauchEndenergieverbrauch } from '/opt/nodejs/db/strom/strom-energieverbrauch-endenergieverbrauch';
import { StromEnergieverbrauchEndenergieverbrauch } from '/opt/nodejs/models/strom/strom-energieverbrauch-endenergieverbrauch';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data: StromEnergieverbrauchEndenergieverbrauch[] =
        await fetchAllStromEnergieverbrauchEndenergieverbrauch();
    const mappedData: StromEnergieverbrauchEndenergieverbrauchApi =
        mapToApiModel(data);

    return createResponse(mappedData);
};
