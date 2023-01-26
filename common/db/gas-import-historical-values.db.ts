import { fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { createId, GasImportHistoricalValue } from '/opt/nodejs/models/gas-import-historical-values.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_HISTORICAL_VALUES]);

export const fetchAllGasImportHistoricalValues = async (): Promise<GasImportHistoricalValue[]> => {
    return fetchAll(tableName);
}

export const findMostRecentGasImportHistoricalValues = async (): Promise<GasImportHistoricalValue> => {
    const records = await fetchAll<GasImportHistoricalValue>(tableName)

    return records.sort(sortFn)
        .slice()
        .reverse()
        .find(entry => entry.nettoimport !== null);
}

const sortFn = (a: GasImportHistoricalValue, b: GasImportHistoricalValue) => a.jahr - b.jahr || a.monat - b.monat;

export const saveAllGasImportHistoricalValues = async (data: GasImportHistoricalValue[]) => {
    await saveAll(tableName, data);
}

