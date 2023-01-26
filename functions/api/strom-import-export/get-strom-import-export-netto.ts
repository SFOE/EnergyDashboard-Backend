import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-import-export-netto.api-model';
import { fetchAllStromImportExportHistoricalValues } from '/opt/nodejs/db/strom-import-export-historical-values.db';
import { fetchAllStromImportExportNetto } from '/opt/nodejs/db/strom-import-export-netto.db';
import { StromImportExportHistoricalValue } from '/opt/nodejs/models/strom-import-export-historical-values.model';
import { StromImportExportNetto } from '/opt/nodejs/models/strom-import-export-netto.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromImportExportNetto();
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
