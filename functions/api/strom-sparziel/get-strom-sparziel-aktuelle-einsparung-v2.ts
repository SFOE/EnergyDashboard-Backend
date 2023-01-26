import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel-aktuelle-einsparung-v2-v3.api-model';
import { fetchAllStromSparzielAktuelleEinsparungV2 } from '/opt/nodejs/db/strom-sparziel-aktuelle-einsparung-v2.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparzielAktuelleEinsparungV2();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

