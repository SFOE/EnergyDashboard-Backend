import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseGasFutures } from '/opt/nodejs/models/preise/preise-gas-futures.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.PREISE_GAS_FUTURES]);

export const fetchAllPreiseGasFutures = async (): Promise<
    PreiseGasFutures[]
> => {
    return fetchAll(tableName);
};

export const saveAllPreiseGasFutures = async (data: PreiseGasFutures[]) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseGasFutures = async () => {
    await deleteAll(tableName);
};
