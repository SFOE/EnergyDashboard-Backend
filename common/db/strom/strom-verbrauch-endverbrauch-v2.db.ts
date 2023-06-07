import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromVerbrauchEndverbrauchV2 } from '/opt/nodejs/models/strom/strom-verbrauch-endverbrauch-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_ENDVERBRAUCH_V2]);

export const fetchAllStromVerbrauchEndverbrauchV2 = async (): Promise<StromVerbrauchEndverbrauchV2[]> => {
    return fetchAll(tableName);
};

export const saveAllStromVerbrauchEndverbrauchV2 = async (data: StromVerbrauchEndverbrauchV2[]) => {
    await saveAll(tableName, data);
};

export const deleteAllStromVerbrauchEndverbrauchV2 = async () => {
    await deleteAll(tableName);
};
