import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllStromKkwAusfaelleFr } from '/opt/nodejs/db/strom/strom-kkw-ausfaelle.db';
import { fetchAllStromKkwVerfuegbarkeitFr } from '/opt/nodejs/db/strom/strom-kkw-verfuegbarkeit.db';
import { mapToApiModel } from '/opt/nodejs/api/strom-kkw-verfuegbarkeit.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromKkwVerfuegbarkeitFr();
    const ausfaelle = await fetchAllStromKkwAusfaelleFr();
    const mappedData = mapToApiModel(data, ausfaelle);

    return createResponse(mappedData);
};
