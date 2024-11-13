import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { StromEnergieverbrauchEndenergieverbrauch } from '/opt/nodejs/models/strom/strom-energieverbrauch-endenergieverbrauch';

const tableName = withEnvPrefix(
    DynamoDBTables[
        // All scenarios are stored in the same table
        SourceFiles.STROM_ENERGIEVERBRAUCH_ENDENERGIEVERBRAUCH_BASIS
    ]
);

export const fetchAllStromEnergieverbrauchEndenergieverbrauch =
    async (): Promise<StromEnergieverbrauchEndenergieverbrauch[]> => {
        return fetchAll(tableName);
    };

export const fetchMostRecentStromEnergieverbrauchEndenergieverbrauch =
    async (): Promise<StromEnergieverbrauchEndenergieverbrauch> => {
        const allEntries =
            await fetchAll<StromEnergieverbrauchEndenergieverbrauch>(tableName);
        allEntries.sort(dateSortFn);
        return allEntries[allEntries.length - 1];
    };

export const saveAllStromEnergieverbrauchEndenergieverbrauch = async (
    data: StromEnergieverbrauchEndenergieverbrauch[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromEnergieverbrauchEndenergieverbrauch = async () => {
    await deleteAll(tableName);
};
