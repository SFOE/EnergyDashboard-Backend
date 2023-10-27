import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchStromSparziel5ProzentEinsparungenV2 } from '/opt/nodejs/db/strom/strom-sparziel-5-prozent-einsparungen-v2.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchStromSparziel5ProzentEinsparungenV2();
    return createResponse(data);
};
