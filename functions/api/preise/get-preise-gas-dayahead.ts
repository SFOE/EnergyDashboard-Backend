import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllPreiseGasDayahead } from '/opt/nodejs/db/preise/preise-gas-dayahead.db';
import { sortFn } from '/opt/nodejs/utils/preise.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllPreiseGasDayahead();
    data.sort(sortFn);

    return createResponse(data);
};
