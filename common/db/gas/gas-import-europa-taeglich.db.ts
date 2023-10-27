import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportEuropaTaeglich } from '/opt/nodejs/models/gas/gas-import-europa-taeglich.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_EUROPA_TAEGLICH]);

export const fetchAllGasImportEuropaTaeglich = async (): Promise<GasImportEuropaTaeglich[]> => {
    return fetchAll(tableName);
};

export const saveAllGasImportEuropaTaeglich = async (data: GasImportEuropaTaeglich[]) => {
    await saveAll(tableName, data);
};

export const deleteAllGasImportEuropaTaeglich = async () => {
    await deleteAll(tableName);
};

