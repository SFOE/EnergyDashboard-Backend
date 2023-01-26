import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/strom-verbrauch-landesverbrauch-mit-prognose-v2.api-model';
import {
    fetchAllStromVerbrauchLandesverbrauchMitPrognoseV2,
} from '/opt/nodejs/db/strom-verbrauch-landesverbrauch-mit-prognose-v2.db';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromVerbrauchLandesverbrauchMitPrognoseV2();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);
    return createResponse(mappedData);
};
