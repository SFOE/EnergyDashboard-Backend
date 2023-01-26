import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-verbrauch-historical-values.api-model';
import { fetchAllStromVerbrauchHistoricalValues } from '/opt/nodejs/db/strom-verbrauch-historical-values.db';
import { StromVerbrauchHistoricalValue } from '/opt/nodejs/models/strom-verbrauch-historical-values.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromVerbrauchHistoricalValues();
    data.sort(sortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};

const sortFn = (a: StromVerbrauchHistoricalValue, b: StromVerbrauchHistoricalValue) => a.monat - b.monat || a.tag - b.tag;
