import { createResponse } from '/opt/nodejs/api/api-requests';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import {
    fetchAllStromSparzielEinsparungAktuellerMonatKundengruppe
} from '/opt/nodejs/db/strom/strom-sparziel-einsparung-aktueller-monat-kundengruppe.db';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-sparziel-einsparung-aktueller-monat-kundengruppe.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparzielEinsparungAktuellerMonatKundengruppe();
    data.sort(dateSortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};
