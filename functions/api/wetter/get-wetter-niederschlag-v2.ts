import { createResponse } from '/opt/nodejs/api/api-requests';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { fetchAllWetterNiederschlagV2 } from '/opt/nodejs/db/wetter/wetter-niederschlag-v2.db';
import { mapToApiModel } from '/opt/nodejs/api/wetter/wetter-niederschlag-v2.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllWetterNiederschlagV2();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};