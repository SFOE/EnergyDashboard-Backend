import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel-aktuelle-einsparung-v2-v3.api-model';
import { fetchAllGasSparzielAktuelleEinsparungV3 } from '/opt/nodejs/db/gas-sparziel-aktuelle-einsparung-v3.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllGasSparzielAktuelleEinsparungV3();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

