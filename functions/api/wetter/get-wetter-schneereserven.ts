import { createResponse } from '/opt/nodejs/api/api-requests';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { fetchAllWetterSchneereserven } from '/opt/nodejs/db/wetter/wetter-schneereserven.db';
import { mapToApiModel } from '/opt/nodejs/api/wetter-schneereserven.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllWetterSchneereserven();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};