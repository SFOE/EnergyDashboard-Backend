import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportNetto } from '/opt/nodejs/models/strom/strom-import-export-netto.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_IMPORT_EXPORT_NETTO]);

export const fetchAllStromImportExportNetto = async (): Promise<StromImportExportNetto[]> => {
    return fetchAll(tableName);
};

export const saveAllStromImportExportNetto = async (data: StromImportExportNetto[]) => {
    await saveAll(tableName, data);
};

export const deleteAllStromImportExportNetto = async () => {
    await deleteAll(tableName);
};

