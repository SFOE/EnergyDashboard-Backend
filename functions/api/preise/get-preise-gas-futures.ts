import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllPreiseGasFutures } from '/opt/nodejs/db/preise/preise-gas-futures.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllPreiseGasFutures();
    data.sort(dateSortFn);

    return createResponse(data);
};
