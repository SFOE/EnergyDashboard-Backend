import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-kkw-produktion.api-model';
import { fetchAllStromKkwAusfaelleCh } from '/opt/nodejs/db/strom/strom-kkw-ausfaelle.db';
import { fetchAllStromKkwProduktionCh } from '/opt/nodejs/db/strom/strom-kkw-produktion.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromKkwProduktionCh();
    const ausfaelle = await fetchAllStromKkwAusfaelleCh();
    const mappedData = mapToApiModel(data, ausfaelle);

    return createResponse(mappedData);
};
