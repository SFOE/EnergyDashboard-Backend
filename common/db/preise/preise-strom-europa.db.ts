import { PreiseStromEuropa } from '../../models/preise/preise-strom-europa.model';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_STROM_EUROPA]
);

export const fetchAllPreiseStromEuropa = async (): Promise<
    PreiseStromEuropa[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseStromEuropa =
    async (): Promise<PreiseStromEuropa> => {
        const items = await fetchAllPreiseStromEuropa();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseStromEuropa = async (data: PreiseStromEuropa[]) => {
    await saveAll(tableName, data);
};

export const deleteAllPreiseStromEuropa = async () => {
    await deleteAll(tableName);
};
