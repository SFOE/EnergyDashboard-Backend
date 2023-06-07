import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    StromSparzielZielAktuellerMonatKundengruppe
} from '/opt/nodejs/models/strom/strom-sparziel-ziel-aktueller-monat-kundengruppe.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_ZIEL_AKTUELLER_MONAT_KUNDENGRUPPE]
);

export const fetchStromSparzielZielAktuellerMonatKundengruppe = async (): Promise<StromSparzielZielAktuellerMonatKundengruppe> => {
    const allEntries = await fetchAll<StromSparzielZielAktuellerMonatKundengruppe>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
};


export const deleteAllStromSparzielZielAktuellerMonatKundengruppe = async () => {
    await deleteAll(tableName);
};

export const saveStromSparzielZielAktuellerMonatKundengruppe = async (
    data: StromSparzielZielAktuellerMonatKundengruppe[]
) => {
    await saveAll(tableName, data);
};
