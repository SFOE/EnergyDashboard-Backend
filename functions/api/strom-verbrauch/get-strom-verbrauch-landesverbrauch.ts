import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-verbrauch-landesverbrauch.api-model';
import { fetchAllStromVerbrauchLandesverbrauch } from '/opt/nodejs/db/strom-verbrauch-landesverbrauch.db';
import { StromVerbrauchLandesverbrauch } from '/opt/nodejs/models/strom-verbrauch-landesverbrauch.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromVerbrauchLandesverbrauch();
    data.sort(sortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};

const sortFn = (a: StromVerbrauchLandesverbrauch, b: StromVerbrauchLandesverbrauch) => a.monat - b.monat;
