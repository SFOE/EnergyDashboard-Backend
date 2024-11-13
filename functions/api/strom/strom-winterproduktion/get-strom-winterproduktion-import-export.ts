import { createResponse } from '/opt/nodejs/api/api-requests';

import {
    mapToApiModel,
    StromWinterproduktionImportExportApi
} from '/opt/nodejs/api/strom/strom-winterproduktion-import-export.api-model';
import { fetchAllStromWinterproduktionImportExport } from '/opt/nodejs/db/strom/strom-winterproduktion-import-export.db';
import { StromWinterproduktionImportExport } from '/opt/nodejs/models/strom/strom-winterproduktion-import-export.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data: StromWinterproduktionImportExport[] =
        await fetchAllStromWinterproduktionImportExport();
    const mappedData: StromWinterproduktionImportExportApi[] =
        mapToApiModel(data);

    return createResponse(mappedData);
};
