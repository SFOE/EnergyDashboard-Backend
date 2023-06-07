import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    StromSparzielEinsparungAktuellerMonatKundengruppe
} from '/opt/nodejs/models/strom/strom-sparziel-einsparung-aktueller-monat-kundengruppe.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_EINSPARUNG_AKTUELLER_MONAT_KUNDENGRUPPE]
);

export const fetchAllStromSparzielEinsparungAktuellerMonatKundengruppe = async (): Promise<
    StromSparzielEinsparungAktuellerMonatKundengruppe[]
> => {
    return fetchAll(tableName);
};

export const deleteAllStromSparzielEinsparungAktuellerMonatKundengruppe = async () => {
    await deleteAll(tableName);
};

export const saveStromSparzielEinsparungAktuellerMonatKundengruppe = async (
    data: StromSparzielEinsparungAktuellerMonatKundengruppe[]
) => {
    await saveAll(tableName, data);
};
