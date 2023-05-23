import { createResponse } from '/opt/nodejs/api/api-requests';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import {
    fetchAllStromSparzielEinsparungProMonatKundengruppe
} from '/opt/nodejs/db/strom-sparziel-einsparung-pro-monat-kundengruppe.db';
import { mapToApiModel } from '/opt/nodejs/api/strom-sparziel-einsparung-pro-monat-kundengruppe.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparzielEinsparungProMonatKundengruppe();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};
