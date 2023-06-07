import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/gas/gas-import-karte.api-model';
import { fetchAllGasImportKarte, fetchCurrentGasImportKarte } from '/opt/nodejs/db/gas/gas-import-karte.db';
import { GasImportKarte } from '/opt/nodejs/models/gas/gas-import-karte.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const entry = await fetchCurrentGasImportKarte();
    const mappedEntry = mapToApiModel(entry);
    return createResponse(mappedEntry);
};
