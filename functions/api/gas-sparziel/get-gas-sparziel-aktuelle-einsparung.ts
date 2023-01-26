import { createResponse } from '/opt/nodejs/api/api-requests';
import { mapToApiModel } from '/opt/nodejs/api/gas-sparziel-aktuelle-einsparung.api-model';
import { fetchAllGasSparzielAktuelleEinsparung } from '/opt/nodejs/db/gas-sparziel-aktuelle-einsparung.db';
import { GasImportHistoricalValue } from '/opt/nodejs/models/gas-import-historical-values.model';
import { GasSparzielAktuelleEinsparung } from '/opt/nodejs/models/gas-sparziel-aktuelle-einsparung.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllGasSparzielAktuelleEinsparung();
    data.sort(sortFn);
    const mappedData = mapToApiModel(data);

    return createResponse(mappedData);
};

const sortFn = (a: GasSparzielAktuelleEinsparung, b: GasSparzielAktuelleEinsparung) => a.jahr - b.jahr || a.monat - b.monat;
