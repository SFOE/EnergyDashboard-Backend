import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseStromEndverbrauch } from '/opt/nodejs/models/preise/preise-strom-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_STROM_ENDVERBRAUCH]
);

export const fetchAllPreiseStromEndverbrauch = async (): Promise<
    PreiseStromEndverbrauch[]
> => {
    return fetchAll(tableName);
};

export const saveAllPreiseStromEndverbrauch = async (
    data: PreiseStromEndverbrauch[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseStromEndverbrauch = async () => {
    await deleteAll(tableName);
};