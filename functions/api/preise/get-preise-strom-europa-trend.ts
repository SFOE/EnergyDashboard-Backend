import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchCurrentPreiseStromEuropaTrend } from '/opt/nodejs/db/preise/preise-strom-europa-trend.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchCurrentPreiseStromEuropaTrend();

    return createResponse(data);
};
