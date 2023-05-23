import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseStromFutures } from '/opt/nodejs/models/preise/preise-strom-futures.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_STROM_FUTURES]
);

export const fetchAllPreiseStromFutures = async (): Promise<
    PreiseStromFutures[]
> => {
    return fetchAll(tableName);
};

export const saveAllPreiseStromFutures = async (data: PreiseStromFutures[]) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseStromFutures = async () => {
    await deleteAll(tableName);
};
