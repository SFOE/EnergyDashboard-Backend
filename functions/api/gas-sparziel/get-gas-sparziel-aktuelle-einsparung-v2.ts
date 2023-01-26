import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/sparziel-aktuelle-einsparung.api-model';
import { fetchAllGasSparzielAktuelleEinsparungV2 } from '/opt/nodejs/db/gas-sparziel-aktuelle-einsparung-v2.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllGasSparzielAktuelleEinsparungV2();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

