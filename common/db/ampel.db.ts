import { fetch, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { Ampel } from '/opt/nodejs/models/ampel.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.AMPEL]);

export const fetchAmpel = async (): Promise<Ampel> => {
    return fetch(tableName);
}

export const saveAmpel = async (data: Ampel) => {
    await saveAll(tableName, [data]);
}
