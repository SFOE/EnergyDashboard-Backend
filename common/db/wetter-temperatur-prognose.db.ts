import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturPrognose } from '/opt/nodejs/models/wetter-temperatur-prognose.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_PROGNOSE]);

export const fetchAllWetterTemperaturPrognose = async (): Promise<WetterTemperaturPrognose[]> => {
    return fetchAll(tableName);
}

export const fetchMostRecentWetterTemperaturPrognoseSchweiz = async (): Promise<WetterTemperaturPrognose> => {
    const allEntries = await fetchAllWetterTemperaturPrognose();
    const schweizEntries = allEntries.filter(entry => entry.station === 'Schweiz');

    schweizEntries.sort(sortFn);
    return schweizEntries[schweizEntries.length - 1];
}

const sortFn = (a: WetterTemperaturPrognose, b: WetterTemperaturPrognose) => new Date(a.datum).getTime() - new Date(b.datum).getTime();


export const saveAllWetterTemperaturPrognose = async (data: WetterTemperaturPrognose[]) => {
    await saveAll(tableName, data);
}
