import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetch, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturTrendV2 } from '/opt/nodejs/models/wetter/wetter-temperatur-trend-v2.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_TREND_V2]
);

export const fetchWetterTemperaturTrendV2 =
    async (): Promise<WetterTemperaturTrendV2> => {
        return fetch<WetterTemperaturTrendV2>(tableName);
    };

export const saveWetterTemperaturTrendV2 = async (
    data: WetterTemperaturTrendV2
) => {
    await saveAll(tableName, [data]);
};

export const deleteAllWetterTemperaturTrendV2 = async () => {
    await deleteAll(tableName);
};

