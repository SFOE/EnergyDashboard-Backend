import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-kkw-produktion.api-model';
import { fetchAllStromKkwAusfaelleFr } from '/opt/nodejs/db/strom/strom-kkw-ausfaelle.db';
import { fetchAllStromKkwProduktionFr } from '/opt/nodejs/db/strom/strom-kkw-produktion.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromKkwProduktionFr();
    const ausfaelle = await fetchAllStromKkwAusfaelleFr();
    const mappedData = mapToApiModel(data, ausfaelle);

    return createResponse(mappedData);
};
