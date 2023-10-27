import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllGasImportEuropaTaeglich } from '/opt/nodejs/db/gas/gas-import-europa-taeglich.db';
import { mapToApiModel } from '/opt/nodejs/api/gas/gas-import-europa-taeglich.api-model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const entries = await fetchAllGasImportEuropaTaeglich();
    entries.sort(dateSortFn);
    const mappedEntries = mapToApiModel(entries);
    return createResponse(mappedEntries);
};
