import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchCurrentGasImportEuropaTrend } from '/opt/nodejs/db/gas/gas-import-europa-trend.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchCurrentGasImportEuropaTrend();

    return createResponse(data);
};
