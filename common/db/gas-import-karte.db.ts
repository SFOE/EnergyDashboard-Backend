import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportKarte } from '/opt/nodejs/models/gas-import-karte.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_KARTE]);

export const fetchCurrentGasImportKarte = async (): Promise<GasImportKarte> => {
    const allEntries = await fetchAll<GasImportKarte>(tableName);
    allEntries.sort(sortFn);
    return allEntries[allEntries.length - 1];
}

const sortFn = (a: GasImportKarte, b: GasImportKarte) => new Date(a.datum).getTime() - new Date(b.datum).getTime();

export const fetchAllGasImportKarte = async (): Promise<GasImportKarte[]> => {
    return fetchAll(tableName);
}

export const saveAllGasImportKarte = async (data: GasImportKarte[]) => {
    await saveAll(tableName, data);
}

