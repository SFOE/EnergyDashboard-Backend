import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportHistoricalValueV2 } from '/opt/nodejs/models/gas/gas-import-historical-values-v2.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_IMPORT_HISTORICAL_VALUES_V2]);

export const fetchAllGasImportHistoricalValuesV2 = async (): Promise<GasImportHistoricalValueV2[]> => {
    return fetchAll(tableName);
};

export const findMostRecentGasImportHistoricalValuesV2 = async (): Promise<GasImportHistoricalValueV2> => {
    const records = await fetchAll<GasImportHistoricalValueV2>(tableName);

    return records.sort(dateSortFn)
        .slice()
        .reverse()
        .find(entry => entry.nettoimport !== null);
};

export const deleteAllGasImportHistoricalValuesV2 = async () => {
    await deleteAll(tableName);
};

export const saveAllGasImportHistoricalValuesV2 = async (data: GasImportHistoricalValueV2[]) => {
    await saveAll(tableName, data);
};

