import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/dynamic-translations.api-model';
import { fetchAllDynamicTranslations } from '/opt/nodejs/db/dynamic-translations.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllDynamicTranslations();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

