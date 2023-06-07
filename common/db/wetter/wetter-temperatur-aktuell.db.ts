import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter/wetter-temperatur-aktuell.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_TEMPERATUR_AKTUELL]
);

const CH_STATION_NAME = 'Schweiz';

export const fetchAllWetterTemperaturAktuell = async (): Promise<
    WetterTemperaturAktuell[]
> => {
    return fetchAll(tableName);
};

export const fetchMostRecentWetterTemperaturAktuellSchweiz =
    async (): Promise<WetterTemperaturAktuell> => {
        const allEntries = await fetchAllWetterTemperaturAktuell();
        const schweizEntries = allEntries.filter(
            (entry) => entry.station === CH_STATION_NAME
        );

        return schweizEntries
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.lufttemperaturTagesmittel !== null);
    };

export const saveAllWetterTemperaturAktuell = async (
    data: WetterTemperaturAktuell[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterTemperaturAktuell = async () => {
    await deleteAll(tableName);
};
