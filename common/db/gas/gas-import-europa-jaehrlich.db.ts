import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportEuropaJaehrlich } from '/opt/nodejs/models/gas/gas-import-europa-jaehrlich.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_EUROPA_JAEHRLICH]);

export const fetchAllGasImportEuropaJaehrlich = async (): Promise<GasImportEuropaJaehrlich[]> => {
    return fetchAll(tableName);
};

export const saveAllGasImportEuropaJaehrlich = async (data: GasImportEuropaJaehrlich[]) => {
    await saveAll(tableName, data);
};

export const deleteAllGasImportEuropaJaehrlich = async () => {
    await deleteAll(tableName);
};

