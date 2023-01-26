import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';
import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { Spartipps } from '/opt/nodejs/models/spartipps.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.SPARTIPPS]);

export const fetchAllSpartipps = async (): Promise<Spartipps[]> => {
    return fetchAll(tableName);
}

export const saveAllSpartipps = async (data: Spartipps[]) => {
    await saveAll(tableName, data);
}
