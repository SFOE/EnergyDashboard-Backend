import { createResponse } from '/opt/nodejs/api/api-requests';
import {
    fetchStromSparzielZielAktuellerMonatKundengruppe
} from '/opt/nodejs/db/strom/strom-sparziel-ziel-aktueller-monat-kundengruppe.db';
import { mapToApiModel } from '/opt/nodejs/api/strom/strom-sparziel-ziel-aktueller-monat-kundengruppe.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchStromSparzielZielAktuellerMonatKundengruppe();
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};
