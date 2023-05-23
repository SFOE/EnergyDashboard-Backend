import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    StromSparzielEinsparungProMonatKundengruppe
} from '/opt/nodejs/models/strom-sparziel-einsparung-pro-monat-kundengruppe.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_EINSPARUNG_PRO_MONAT_KUNDENGRUPPE]
);

export const fetchAllStromSparzielEinsparungProMonatKundengruppe = async (): Promise<
    StromSparzielEinsparungProMonatKundengruppe[]
> => {
    return fetchAll(tableName);
};

export const deleteAllStromSparzielEinsparungProMonatKundengruppe = async () => {
    await deleteAll(tableName);
};

export const saveStromSparzielEinsparungProMonatKundengruppe = async (
    data: StromSparzielEinsparungProMonatKundengruppe[]
) => {
    await saveAll(tableName, data);
};
