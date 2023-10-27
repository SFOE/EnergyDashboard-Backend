import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { SparzielZielV5 } from '../../models/sparziel/sparziel-ziel-v5.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_ZIEL_V5]
);

export const fetchStromSparzielZielV5 = async (): Promise<SparzielZielV5> => {
    const allEntries = await fetchAll<SparzielZielV5>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
};

export const deleteAllStromSparzielZielV5 = async () => {
    await deleteAll(tableName);
};

export const saveStromSparzielZielV5 = async (data: SparzielZielV5) => {
    await saveAll(tableName, [data]);
};
