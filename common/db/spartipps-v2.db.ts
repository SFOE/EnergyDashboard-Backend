import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';
import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SpartippsV2 } from '/opt/nodejs/models/spartipps-v2.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.SPARTIPPS_V2]);

export const fetchAllSpartippsV2 = async (): Promise<SpartippsV2[]> => {
    return fetchAll(tableName);
}

export const saveAllSpartippsV2 = async (data: SpartippsV2[]) => {
    await saveAll(tableName, data);
}
