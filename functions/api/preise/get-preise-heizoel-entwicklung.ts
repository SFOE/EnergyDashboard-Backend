import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllPreiseHeizoelEntwicklung } from '/opt/nodejs/db/preise/preise-heizoel-entwicklung.db';
import { sortFn } from '/opt/nodejs/utils/preise.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllPreiseHeizoelEntwicklung();
    data.sort(sortFn);

    return createResponse(data);
};
