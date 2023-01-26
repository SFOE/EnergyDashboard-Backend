import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseGasBoerse } from '/opt/nodejs/models/preise/preise-gas-boerse.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.PREISE_GAS_BOERSE]);

export const fetchAllPreiseGasBoerse = async (): Promise<PreiseGasBoerse[]> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseGasBoerse =
    async (): Promise<PreiseGasBoerse> => {
        const items = await fetchAllPreiseGasBoerse();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseGasBoerse = async (data: PreiseGasBoerse[]) => {
    await saveAll(tableName, data);
};
