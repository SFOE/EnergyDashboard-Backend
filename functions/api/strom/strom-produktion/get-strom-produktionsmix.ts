import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-produktionsmix.api-model';
import { fetchAllStromProduktionsMix } from '/opt/nodejs/db/strom/strom-produktionsmix.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromProduktionsMix();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

