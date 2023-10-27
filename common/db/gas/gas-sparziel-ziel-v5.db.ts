import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { GasSparzielV5 } from '../../models/gas/gas-sparziel-v5.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.GAS_SPARZIEL_ZIEL_V5]
);

export const fetchGasSparzielZielV5 = async (): Promise<GasSparzielV5> => {
    const allEntries = await fetchAll<GasSparzielV5>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
};

export const deleteAllGasSparzielZielV5 = async () => {
    await deleteAll(tableName);
};

export const saveGasSparzielZielV5 = async (data: GasSparzielV5) => {
    await saveAll(tableName, [data]);
};
