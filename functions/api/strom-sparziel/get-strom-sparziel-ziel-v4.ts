import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchStromSparzielZielV4 } from '/opt/nodejs/db/strom/strom-sparziel-ziel-v4.db';
import { mapToApiModel } from '/opt/nodejs/api/sparziel/sparziel-ziel-v4.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchStromSparzielZielV4();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

