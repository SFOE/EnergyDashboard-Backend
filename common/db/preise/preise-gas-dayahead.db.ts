import { PreiseGasDayahead } from '/opt/nodejs/models/preise/preise-gas-dayahead.model';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_GAS_DAYAHEAD]
);

export const fetchAllPreiseGasDayahead = async (): Promise<
    PreiseGasDayahead[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseGasDayahead =
    async (): Promise<PreiseGasDayahead> => {
        const items = await fetchAllPreiseGasDayahead();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseGasDayahead = async (data: PreiseGasDayahead[]) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseGasDayahead = async () => {
    await deleteAll(tableName);
};
