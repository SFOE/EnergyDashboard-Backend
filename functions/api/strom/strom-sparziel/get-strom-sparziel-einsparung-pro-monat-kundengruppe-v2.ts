import { createResponse } from '/opt/nodejs/api/api-requests';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import {
    fetchAllStromSparzielEinsparungProMonatKundengruppeV2
} from '/opt/nodejs/db/strom/strom-sparziel-einsparung-pro-monat-kundengruppe-v2.db';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-sparziel-einsparung-pro-monat-kundengruppe-v2.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparzielEinsparungProMonatKundengruppeV2();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};
