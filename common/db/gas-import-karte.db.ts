import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';
import { dateSortFn } from '../utils/sort.utils';
import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportKarte } from '/opt/nodejs/models/gas-import-karte.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_KARTE]);

export const fetchCurrentGasImportKarte = async (): Promise<GasImportKarte> => {
    const allEntries = await fetchAll<GasImportKarte>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
};

export const fetchAllGasImportKarte = async (): Promise<GasImportKarte[]> => {
    return fetchAll(tableName);
};

export const saveAllGasImportKarte = async (data: GasImportKarte[]) => {
    await saveAll(tableName, data);
};
