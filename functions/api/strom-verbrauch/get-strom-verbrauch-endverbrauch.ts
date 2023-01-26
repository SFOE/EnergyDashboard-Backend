import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-verbrauch-endverbrauch.api-model';
import { fetchAllStromVerbrauchEndverbrauch } from '/opt/nodejs/db/strom-verbrauch-endverbrauch.db';
import { StromVerbrauchEndverbrauch } from '/opt/nodejs/models/strom-verbrauch-endverbrauch.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromVerbrauchEndverbrauch();
    data.sort(sortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};

const sortFn = (a: StromVerbrauchEndverbrauch, b: StromVerbrauchEndverbrauch) => a.monat - b.monat || a.tag - b.tag;
