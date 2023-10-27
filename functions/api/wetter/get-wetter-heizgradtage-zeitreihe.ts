import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllWetterHeizgradtageZeitreihe } from '/opt/nodejs/db/wetter/wetter-heizgradtage-zeitreihe.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { mapToApiModel } from '/opt/nodejs/api/wetter/wetter-heizgradtage-zeitreihe.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllWetterHeizgradtageZeitreihe();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
