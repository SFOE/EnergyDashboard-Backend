import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromEnergieverbrauchBruttoenergieverbrauch } from '/opt/nodejs/models/strom/strom-energieverbrauch-bruttoenergieverbrauch';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[
        // All scenarios are stored in the same table
        SourceFiles.STROM_ENERGIEVERBRAUCH_BRUTTOENERGIEVERBRAUCH_BASIS
    ]
);

export const fetchAllStromEnergieverbrauchBruttoenergieverbrauch =
    async (): Promise<StromEnergieverbrauchBruttoenergieverbrauch[]> => {
        return fetchAll(tableName);
    };

export const fetchMostRecentStromEnergieverbrauchBruttoenergieverbrauch =
    async (): Promise<StromEnergieverbrauchBruttoenergieverbrauch> => {
        const allEntries =
            await fetchAll<StromEnergieverbrauchBruttoenergieverbrauch>(
                tableName
            );
        allEntries.sort(dateSortFn);
        return allEntries[allEntries.length - 1];
    };

export const saveAllStromEnergieverbrauchBruttoenergieverbrauch = async (
    data: StromEnergieverbrauchBruttoenergieverbrauch[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromEnergieverbrauchBruttoenergieverbrauch =
    async () => {
        await deleteAll(tableName);
    };
