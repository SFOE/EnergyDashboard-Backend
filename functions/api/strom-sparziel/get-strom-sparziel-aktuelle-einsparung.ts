import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel-aktuelle-einsparung.api-model';
import { fetchAllStromSparzielAktuelleEinsparung } from '/opt/nodejs/db/strom-sparziel-aktuelle-einsparung.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparzielAktuelleEinsparung();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

