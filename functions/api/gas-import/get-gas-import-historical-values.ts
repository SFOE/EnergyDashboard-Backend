import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/gas-import-historical-values.api-model';
import { fetchAllGasImportHistoricalValues } from '/opt/nodejs/db/gas-import-historical-values.db';
import { GasImportHistoricalValue } from '/opt/nodejs/models/gas-import-historical-values.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllGasImportHistoricalValues();
    data.sort(sortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};

const sortFn = (a: GasImportHistoricalValue, b: GasImportHistoricalValue) => a.monat - b.monat || a.jahr - b.jahr;
