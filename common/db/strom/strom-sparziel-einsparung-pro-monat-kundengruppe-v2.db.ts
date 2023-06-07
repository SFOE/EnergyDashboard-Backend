import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    StromSparzielEinsparungProMonatKundengruppeV2
} from '/opt/nodejs/models/strom/strom-sparziel-einsparung-pro-monat-kundengruppe-v2.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_EINSPARUNG_PRO_MONAT_KUNDENGRUPPE_V2]
);

export const fetchAllStromSparzielEinsparungProMonatKundengruppeV2 = async (): Promise<
    StromSparzielEinsparungProMonatKundengruppeV2[]
> => {
    return fetchAll(tableName);
};

export const deleteAllStromSparzielEinsparungProMonatKundengruppeV2 = async () => {
    await deleteAll(tableName);
};

export const saveStromSparzielEinsparungProMonatKundengruppeV2 = async (
    data: StromSparzielEinsparungProMonatKundengruppeV2[]
) => {
    await saveAll(tableName, data);
};
