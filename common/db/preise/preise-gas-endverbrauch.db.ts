import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseGasEndverbrauch } from '/opt/nodejs/models/preise/preise-gas-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_GAS_ENDVERBRAUCH]
);

export const fetchAllPreiseGasEndverbrauch = async (): Promise<
    PreiseGasEndverbrauch[]
> => {
    return fetchAll(tableName);
};

export const saveAllPreiseGasEndverbrauch = async (
    data: PreiseGasEndverbrauch[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseGasEndverbrauch = async () => {
    await deleteAll(tableName);
};