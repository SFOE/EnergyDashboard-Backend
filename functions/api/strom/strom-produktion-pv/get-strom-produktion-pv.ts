import { createResponse } from '/opt/nodejs/api/api-requests';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { fetchAllStromProduktionPv } from '/opt/nodejs/db/strom/strom-produktion-pv.db';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-produktion-pv.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromProduktionPv();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};