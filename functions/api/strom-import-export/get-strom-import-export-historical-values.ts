import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllStromImportExportHistoricalValues } from '/opt/nodejs/db/strom-import-export-historical-values.db';
import { StromImportExportHistoricalValue } from '/opt/nodejs/models/strom-import-export-historical-values.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromImportExportHistoricalValues();
    data.sort(sortFn);
    return createResponse(data);
};

const sortFn = (a: StromImportExportHistoricalValue, b: StromImportExportHistoricalValue) => a.kalenderwoche - b.kalenderwoche;
