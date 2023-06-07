import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchStromSparziel5ProzentEinsparungen } from '/opt/nodejs/db/strom/strom-sparziel-5-prozent-einsparungen.db';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-sparziel-5-prozent-einsparungen.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchStromSparziel5ProzentEinsparungen();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
