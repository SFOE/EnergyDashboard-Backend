import { GasImportEuropaTrend } from '../../models/gas/gas-import-europa-trend.model';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.GAS_IMPORT_EUROPA_TREND]
);

const fetchAllGasImportEuropaTrend = async (): Promise<
    GasImportEuropaTrend[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentGasImportEuropaTrend =
    async (): Promise<GasImportEuropaTrend> => {
        const items = await fetchAllGasImportEuropaTrend();
        return getMostRecentEntry(items);
    };

export const saveGasImportEuropaTrend = async (
    data: GasImportEuropaTrend[]
) => {
    await saveAll(tableName, data);
};

export const deleteGasImportEuropaTrend = async () => {
    await deleteAll(tableName);
};
