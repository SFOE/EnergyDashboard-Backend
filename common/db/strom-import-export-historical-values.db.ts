import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { FuellstandGasspeicher } from '/opt/nodejs/models/fuellstand-gasspeicher.model';
import { StromImportExportHistoricalValue } from '/opt/nodejs/models/strom-import-export-historical-values.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_IMPORT_EXPORT_HISTORICAL_VALUES]);

export const fetchAllStromImportExportHistoricalValues = async (): Promise<StromImportExportHistoricalValue[]> => {
    return fetchAll(tableName);
}

export const saveAllStromImportExportHistoricalValues = async (data: StromImportExportHistoricalValue[]) => {
    await saveAll(tableName, data);
}

