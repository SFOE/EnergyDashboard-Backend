import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SparzielZiel } from '/opt/nodejs/models/sparziel-ziel.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_SPARZIEL_ZIEL]);

export const fetchStromSparzielZiel = async (): Promise<SparzielZiel> => {
    const allEntries = await fetchAll<SparzielZiel>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
}

export const deleteAllStromSparzielZiel = async () => {
    await deleteAll(tableName);
}

export const saveStromSparzielZiel = async (data: SparzielZiel) => {
    await saveAll(tableName, [data]);
}