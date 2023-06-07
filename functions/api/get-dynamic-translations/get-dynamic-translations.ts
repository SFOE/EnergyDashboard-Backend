import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/dashboard/dynamic-translations.api-model';
import { fetchAllDynamicTranslations } from '/opt/nodejs/db/dashboard/dynamic-translations.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllDynamicTranslations();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

