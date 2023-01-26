import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseBrennholzEndverbrauch } from '/opt/nodejs/models/preise/preise-brennholz-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_BRENNHOLZ_ENDVERBRAUCH]
);

export const fetchAllPreiseBrennholzEndverbrauch = async (): Promise<
    PreiseBrennholzEndverbrauch[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentBrennholzEndverbrauch =
    async (): Promise<PreiseBrennholzEndverbrauch> => {
        const items = await fetchAllPreiseBrennholzEndverbrauch();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseBrennholzEndverbrauch = async (
    data: PreiseBrennholzEndverbrauch[]
) => {
    await saveAll(tableName, data);
};
