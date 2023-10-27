import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-produktion-import-verbrauch.api-model';
import { fetchAllStromProduktionImportVerbrauch } from '/opt/nodejs/db/strom/strom-produktion-import-verbrauch.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromProduktionImportVerbrauch();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

