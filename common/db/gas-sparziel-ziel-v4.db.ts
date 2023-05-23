import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';
import { SparzielZielV4 } from '/opt/nodejs/models/sparziel-ziel-v4.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_SPARZIEL_ZIEL_V4]);

export const fetchGasSparzielZielV4 = async (): Promise<SparzielZielV4> => {
    const allEntries = await fetchAll<SparzielZielV4>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
};

export const deleteAllGasSparzielZielV4 = async () => {
    await deleteAll(tableName);
};

export const saveGasSparzielZielV4 = async (data: SparzielZielV4) => {
    await saveAll(tableName, [data]);
};
