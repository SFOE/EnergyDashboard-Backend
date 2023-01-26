import { deleteAll, fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportHistoricalValueV2 } from '/opt/nodejs/models/gas-import-historical-values-v2.model';
import { createId, GasImportHistoricalValue } from '/opt/nodejs/models/gas-import-historical-values.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_HISTORICAL_VALUES_V2]);

export const fetchAllGasImportHistoricalValuesV2 = async (): Promise<GasImportHistoricalValueV2[]> => {
    return fetchAll(tableName);
}

export const findMostRecentGasImportHistoricalValuesV2 = async (): Promise<GasImportHistoricalValueV2> => {
    const records = await fetchAll<GasImportHistoricalValueV2>(tableName)

    return records.sort(dateSortFn)
        .slice()
        .reverse()
        .find(entry => entry.nettoimport !== null);
}

export const deleteAllGasImportHistoricalValuesV2 = async () => {
    await deleteAll(tableName);
}

export const saveAllGasImportHistoricalValuesV2 = async (data: GasImportHistoricalValueV2[]) => {
    await saveAll(tableName, data);
}

