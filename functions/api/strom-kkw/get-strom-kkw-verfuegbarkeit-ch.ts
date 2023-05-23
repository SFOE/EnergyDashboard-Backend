import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllStromKkwAusfaelleCh } from '/opt/nodejs/db/strom/strom-kkw-ausfaelle.db';
import { fetchAllStromKkwVerfuegbarkeitCh } from '/opt/nodejs/db/strom/strom-kkw-verfuegbarkeit.db';
import { mapToApiModel } from '/opt/nodejs/api/strom-kkw-verfuegbarkeit.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromKkwVerfuegbarkeitCh();
    const ausfaelle = await fetchAllStromKkwAusfaelleCh();
    const mappedData = mapToApiModel(data, ausfaelle);

    return createResponse(mappedData);
};
