import { SourceFiles } from '../../source-files';
import { withEnvPrefix } from '../../utils/env.utils';
import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturPrognose } from '/opt/nodejs/models/wetter/wetter-temperatur-prognose.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_PROGNOSE]
);

export const fetchAllWetterTemperaturPrognose = async (): Promise<
    WetterTemperaturPrognose[]
> => {
    return fetchAll(tableName);
};

export const fetchMostRecentWetterTemperaturPrognoseSchweiz = async (): Promise<
    WetterTemperaturPrognose | undefined
> => {
    const allEntries = await fetchAllWetterTemperaturPrognose();
    const schweizEntries = allEntries.filter(
        (entry) => entry.station === 'Schweiz'
    );

    schweizEntries.sort(dateSortFn);
    if (schweizEntries.length > 0) {
        return schweizEntries[schweizEntries.length - 1];
    }
};

export const saveAllWetterTemperaturPrognose = async (
    data: WetterTemperaturPrognose[]
) => {
    await saveAll(tableName, data);
};
