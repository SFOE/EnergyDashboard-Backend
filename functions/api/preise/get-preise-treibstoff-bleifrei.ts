import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllPreiseTreibstoffBleifrei } from '/opt/nodejs/db/preise/preise-treibstoff-bleifrei.db';
import { sortFn } from '/opt/nodejs/utils/preise.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllPreiseTreibstoffBleifrei();
    data.sort(sortFn);

    return createResponse(data);
};
