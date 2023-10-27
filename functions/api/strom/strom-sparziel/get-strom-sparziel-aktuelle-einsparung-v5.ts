import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel/sparziel-aktuelle-einsparung-v5.api-model';
import {
    fetchAllStromSparzielAktuelleEinsparungV5
} from '/opt/nodejs/db/strom/strom-sparziel-aktuelle-einsparung-v5.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparzielAktuelleEinsparungV5();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};
