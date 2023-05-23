import { SourceFiles } from '../../source-files';
import { withEnvPrefix } from '../../utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterNiederschlag } from '/opt/nodejs/models/wetter/wetter-niederschlag.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_NIEDERSCHLAG]
);

export const fetchAllWetterNiederschlag = async (): Promise<
    WetterNiederschlag[]
> => {
    return fetchAll(tableName);
};


export const fetchMostRecentWetterNiederschlag =
    async (): Promise<WetterNiederschlag> => {
        const allEntries = await fetchAllWetterNiederschlag();

        return allEntries
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.differenzZuNormProzent !== null);
    };

export const saveAllWetterNiederschlag = async (
    data: WetterNiederschlag[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterNiederschlag = async () => {
    await deleteAll(tableName);
};
