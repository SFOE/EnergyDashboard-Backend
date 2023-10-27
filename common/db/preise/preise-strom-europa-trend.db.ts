import { PreiseStromEuropaTrend } from '../../models/preise/preise-strom-europa-trend.model';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_STROM_EUROPA_TREND]
);

const fetchAllPreiseStromEuropaTrend = async (): Promise<
    PreiseStromEuropaTrend[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseStromEuropaTrend =
    async (): Promise<PreiseStromEuropaTrend> => {
        const items = await fetchAllPreiseStromEuropaTrend();
        return getMostRecentEntry(items);
    };

export const savePreiseStromEuropaTrend = async (
    data: PreiseStromEuropaTrend[]
) => {
    await saveAll(tableName, data);
};

export const deletePreiseStromEuropaTrend = async () => {
    await deleteAll(tableName);
};
