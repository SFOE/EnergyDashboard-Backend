import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseStromBoerse } from '/opt/nodejs/models/preise/preise-strom-boerse.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_STROM_BOERSE]
);

export const fetchAllPreiseStromBoerse = async (): Promise<
    PreiseStromBoerse[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseStromBoerse =
    async (): Promise<PreiseStromBoerse> => {
        const items = await fetchAllPreiseStromBoerse();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseStromBoerse = async (data: PreiseStromBoerse[]) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseStromBoerse = async () => {
    await deleteAll(tableName);
};