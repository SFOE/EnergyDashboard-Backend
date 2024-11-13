import { createResponse } from '/opt/nodejs/api/api-requests';
import { StromWinterproduktionEinzelneEnergietraeger } from '/opt/nodejs/models/strom/strom-winterproduktion-einzelne-energietraeger.model';
import {
    mapToApiModel,
    StromWinterproduktionEinzelneEnergietraegerApi
} from '/opt/nodejs/api/strom/strom-winterproduktion-einzelne-energietraeger.api-model';
import { fetchAllStromWinterproduktionEinzelneEnergietraeger } from '/opt/nodejs/db/strom/strom-winterproduktion-einzelne-energietraeger.db';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data: StromWinterproduktionEinzelneEnergietraeger[] =
        await fetchAllStromWinterproduktionEinzelneEnergietraeger();
    const mappedData: StromWinterproduktionEinzelneEnergietraegerApi[] =
        mapToApiModel(data);

    return createResponse(mappedData);
};
