import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { WetterNiederschlagV2 } from '/opt/nodejs/models/wetter/wetter-niederschlag-v2.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_NIEDERSCHLAG_V2]
);

export const fetchAllWetterNiederschlagV2 = async (): Promise<
    WetterNiederschlagV2[]
> => {
    return fetchAll(tableName);
};


export const fetchMostRecentWetterNiederschlagV2 =
    async (): Promise<WetterNiederschlagV2> => {
        const allEntries = await fetchAllWetterNiederschlagV2();

        return allEntries
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.niederschlagGemessen !== null);
    };

export const saveAllWetterNiederschlagV2 = async (
    data: WetterNiederschlagV2[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterNiederschlagV2 = async () => {
    await deleteAll(tableName);
};
