import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchCurrentWetterHeizgradtageTrend } from '/opt/nodejs/db/wetter/wetter-heizgradtage-trend.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchCurrentWetterHeizgradtageTrend();
    return createResponse(data);
};
