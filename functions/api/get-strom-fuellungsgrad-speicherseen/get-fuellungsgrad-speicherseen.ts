import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/fuellungsgrad-speicherseen.api-model';
import { fetchAllFuellungsgradSpeicherseen } from '/opt/nodejs/db/fuellungsgrad-speicherseen.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllFuellungsgradSpeicherseen();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

