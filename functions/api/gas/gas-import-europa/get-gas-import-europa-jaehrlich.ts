import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllGasImportEuropaJaehrlich } from '/opt/nodejs/db/gas/gas-import-europa-jaehrlich.db';
import { mapToApiModel } from '/opt/nodejs/api/gas/gas-import-europa-jaehrlich.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const entries = await fetchAllGasImportEuropaJaehrlich();
    const mappedEntries = mapToApiModel(entries);
    return createResponse(mappedEntries);
};
