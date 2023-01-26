import { fetch, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturTrend } from '/opt/nodejs/models/wetter-temperatur-trend.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_TREND]);

export const fetchWetterTemperaturTrend = async (): Promise<WetterTemperaturTrend> => {
    return fetch<WetterTemperaturTrend>(tableName);
}

export const saveWetterTemperaturTrend = async (data: WetterTemperaturTrend) => {
    await saveAll(tableName, [data]);
}
