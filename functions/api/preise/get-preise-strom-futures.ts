import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllPreiseStromFutures } from '/opt/nodejs/db/preise/preise-strom-futures.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllPreiseStromFutures();
    data.sort(dateSortFn);

    return createResponse(data);
};
