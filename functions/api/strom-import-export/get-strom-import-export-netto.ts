import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-import-export-netto.api-model';
import { fetchAllStromImportExportNetto } from '/opt/nodejs/db/strom/strom-import-export-netto.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromImportExportNetto();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
