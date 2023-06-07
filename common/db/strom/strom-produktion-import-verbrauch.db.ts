import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromProduktionImportVerbrauch } from '/opt/nodejs/models/strom/strom-produktion-import-verbrauch.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_PRODUKTION_IMPORT_VERBRAUCH]
);

export const fetchAllStromProduktionImportVerbrauch = async (): Promise<
    StromProduktionImportVerbrauch[]
> => {
    return fetchAll(tableName);
};

export const fetchMostRecentStromProduktionImportVerbrauch =
    async (): Promise<StromProduktionImportVerbrauch> => {
        const allEntries = await fetchAll<StromProduktionImportVerbrauch>(
            tableName
        );
        allEntries.sort(dateSortFn);
        return allEntries[allEntries.length - 1];
    };

export const saveAllStromProduktionImportVerbrauch = async (
    data: StromProduktionImportVerbrauch[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromProduktionImportVerbrauch = async () => {
    await deleteAll(tableName);
};

