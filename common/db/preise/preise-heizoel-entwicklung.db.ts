import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseHeizoelEntwicklung } from '/opt/nodejs/models/preise/preise-heizoel-entwicklung.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_HEIZOEL_ENTWICKLUNG]
);

export const fetchAllPreiseHeizoelEntwicklung = async (): Promise<
    PreiseHeizoelEntwicklung[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseHeizoelEntwicklung =
    async (): Promise<PreiseHeizoelEntwicklung> => {
        const items = await fetchAllPreiseHeizoelEntwicklung();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseHeizoelEntwicklung = async (
    data: PreiseHeizoelEntwicklung[]
) => {
    await saveAll(tableName, data);
};
