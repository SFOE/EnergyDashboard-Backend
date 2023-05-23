import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/wetter-temperatur-trend.api-model';
import { fetchAllWetterTemperaturAktuell } from '/opt/nodejs/db/wetter/wetter-temperatur-aktuell.db';
import { fetchWetterTemperaturTrend } from '/opt/nodejs/db/wetter/wetter-temperatur-trend-v2.db';
import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter/wetter-temperatur-aktuell.model';
import { groupBy } from '/opt/nodejs/utils/array.utils';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const trendData = await fetchWetterTemperaturTrend();
    const temperaturData = await getCurrentTemperaturEntryPerStation();

    const mappedData = mapToApiModel(trendData, temperaturData);
    return createResponse(mappedData);
};

const getCurrentTemperaturEntryPerStation = async (): Promise<
    WetterTemperaturAktuell[]
> => {
    const temperaturAktuell = await fetchAllWetterTemperaturAktuell();

    const response: WetterTemperaturAktuell[] = [];
    const group = groupBy(temperaturAktuell, 'station');

    for (const value of Object.values<WetterTemperaturAktuell[]>(group)) {
        const mostRecentEntry = value
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.lufttemperaturTagesmittel !== null);
        response.push(mostRecentEntry);
    }

    return response;
};
