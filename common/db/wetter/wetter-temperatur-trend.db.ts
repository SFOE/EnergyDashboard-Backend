import { SourceFiles } from '../../source-files';
import { withEnvPrefix } from '../../utils/env.utils';
import { fetch, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturTrend } from '/opt/nodejs/models/wetter/wetter-temperatur-trend.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_TREND]
);

export const fetchWetterTemperaturTrend =
    async (): Promise<WetterTemperaturTrend> => {
        return fetch<WetterTemperaturTrend>(tableName);
    };

export const saveWetterTemperaturTrend = async (
    data: WetterTemperaturTrend
) => {
    await saveAll(tableName, [data]);
};
