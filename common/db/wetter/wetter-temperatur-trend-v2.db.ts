import { SourceFiles } from '../../source-files';
import { withEnvPrefix } from '../../utils/env.utils';
import { fetch, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturTrendV2 } from '/opt/nodejs/models/wetter/wetter-temperatur-trend-v2.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_TREND_V2]
);

export const fetchWetterTemperaturTrend =
    async (): Promise<WetterTemperaturTrendV2> => {
        return fetch<WetterTemperaturTrendV2>(tableName);
    };

export const saveWetterTemperaturTrend = async (
    data: WetterTemperaturTrendV2
) => {
    await saveAll(tableName, [data]);
};
