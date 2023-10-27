import { createResponse } from '/opt/nodejs/api/api-requests';
import { getMostRecentEntry } from '/opt/nodejs/db/wetter/wetter-heizgradtage-tabelle-daten.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await getMostRecentEntry();
    return createResponse(data);
};
