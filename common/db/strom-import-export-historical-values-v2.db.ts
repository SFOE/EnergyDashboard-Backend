import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportHistoricalValueV2 } from '/opt/nodejs/models/strom-import-export-historical-values-v2.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_IMPORT_EXPORT_HISTORICAL_VALUES_V2]);

export const fetchAllStromImportExportHistoricalValuesV2 = async (): Promise<StromImportExportHistoricalValueV2[]> => {
    return fetchAll(tableName);
}

export const saveAllStromImportExportHistoricalValuesV2 = async (data: StromImportExportHistoricalValueV2[]) => {
    await saveAll(tableName, data);
}

export const deleteAllStromImportExportHistoricalValuesV2 = async () => {
    await deleteAll(tableName);
}

