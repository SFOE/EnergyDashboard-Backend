import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { WetterSchneereserven } from '/opt/nodejs/models/wetter/wetter-schneereserven.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_SCHNEERESERVEN]
);

export const fetchAllWetterSchneereserven = async (): Promise<
    WetterSchneereserven[]
> => {
    return fetchAll(tableName);
};


export const fetchMostRecentWetterSchneereserven =
    async (): Promise<WetterSchneereserven> => {
        const allEntries = await fetchAllWetterSchneereserven();

        return allEntries
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.aktuellMm !== null);
    };

export const saveAllWetterSchneereserven = async (
    data: WetterSchneereserven[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterSchneereserven = async () => {
    await deleteAll(tableName);
};
