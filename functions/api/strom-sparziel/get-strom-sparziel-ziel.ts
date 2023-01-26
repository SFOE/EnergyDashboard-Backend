import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel-ziel.api-model';
import { fetchStromSparzielZiel } from '/opt/nodejs/db/strom-sparziel-ziel.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchStromSparzielZiel();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

