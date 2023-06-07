import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { WetterNiederschlagBilderDaten } from '/opt/nodejs/models/wetter/wetter-niederschlag-bilder-daten.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_NIEDERSCHLAG_BILDER_DATEN]
);

export const fetchWetterNiederschlagBilderDaten = async (): Promise<WetterNiederschlagBilderDaten> => {
    const allEntries = await fetchAll<WetterNiederschlagBilderDaten>(tableName);
    allEntries.sort(dateSortFn);
    return allEntries[allEntries.length - 1];
};

export const deleteAllWetterNiederschlagBilderDaten = async () => {
    await deleteAll(tableName);
};

export const saveWetterNiederschlagBilderDaten = async (data: WetterNiederschlagBilderDaten) => {
    await saveAll(tableName, [data]);
};
