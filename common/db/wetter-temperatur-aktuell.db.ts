import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter-temperatur-aktuell.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_AKTUELL]);

export const fetchAllWetterTemperaturAktuell = async (): Promise<WetterTemperaturAktuell[]> => {
    return fetchAll(tableName);
}

export const fetchMostRecentWetterTemperaturAktuellSchweiz = async (): Promise<WetterTemperaturAktuell> => {
    const allEntries = await fetchAllWetterTemperaturAktuell();
    const schweizEntries = allEntries.filter(entry => entry.station === 'Schweiz');

    return schweizEntries
        .sort(sortFn)
        .slice()
        .reverse()
        .find(entry => entry.lufttemperaturTagesmittel !== null);
}

const sortFn = (a: WetterTemperaturAktuell, b: WetterTemperaturAktuell) => new Date(a.datum).getTime() - new Date(b.datum).getTime();


export const saveAllWetterTemperaturAktuell = async (data: WetterTemperaturAktuell[]) => {
    await saveAll(tableName, data);
}

export const deleteAllWetterTemperaturAktuell = async () => {
    await deleteAll(tableName);
}

