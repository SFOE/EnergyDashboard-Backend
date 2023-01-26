import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { DynamicTranslation } from '/opt/nodejs/models/dynamic-translation.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.DYNAMIC_TRANSLATIONS]);

export const fetchAllDynamicTranslations = async (): Promise<DynamicTranslation[]> => {
    return fetchAll(tableName);
}

export const saveAllDynamicTranslations = async (data: DynamicTranslation[]) => {
    await saveAll(tableName, data);
}
