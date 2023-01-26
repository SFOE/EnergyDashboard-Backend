import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-fuellungsgrad-speicherseen-v2.api-model';
import { fetchAllStromFuellungsgradSpeicherseenV2 } from '/opt/nodejs/db/strom-fuellungsgrad-speicherseen-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromFuellungsgradSpeicherseenV2();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

