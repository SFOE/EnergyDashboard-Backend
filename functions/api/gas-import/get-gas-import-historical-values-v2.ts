import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/gas-import-historical-values-v2.api-model';
import { fetchAllGasImportHistoricalValuesV2 } from '/opt/nodejs/db/gas-import-historical-values-v2.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllGasImportHistoricalValuesV2();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};

