import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllWetterNiederschlag } from '/opt/nodejs/db/wetter/wetter-niederschlag.db';
import { mapToApiModel } from '/opt/nodejs/api/wetter-niederschlag.api-model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllWetterNiederschlag();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};