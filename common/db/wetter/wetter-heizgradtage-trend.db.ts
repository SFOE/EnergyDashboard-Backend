import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterHeizgradtageTrend } from '../../models/wetter/wetter-heizgradtage-trend.model';
import { getMostRecentEntry } from '../../utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_HEIZGRADTAGE_TREND]
);

const fetchAllWetterHeizgradtageTrend = async (): Promise<
    WetterHeizgradtageTrend[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentWetterHeizgradtageTrend =
    async (): Promise<WetterHeizgradtageTrend> => {
        const items = await fetchAllWetterHeizgradtageTrend();
        return getMostRecentEntry(items);
    };

export const saveAllWetterHeizgradtageTrend = async (
    data: WetterHeizgradtageTrend[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterHeizgradtageTrend = async () => {
    await deleteAll(tableName);
};
