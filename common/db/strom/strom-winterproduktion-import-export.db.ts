import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { StromWinterproduktionImportExport } from '/opt/nodejs/models/strom/strom-winterproduktion-import-export.model';

const tableName: string = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_WINTERPRODUKTION_IMPORT_EXPORT]
);

export const fetchAllStromWinterproduktionImportExport = async (): Promise<
    StromWinterproduktionImportExport[]
> => {
    const entries: StromWinterproduktionImportExport[] =
        await fetchAll<StromWinterproduktionImportExport>(tableName);
    return entries.sort(dateSortFn);
};

export const saveAllStromWinterproduktionImportExport = async (
    data: StromWinterproduktionImportExport[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWinterproduktionImportExport = async () => {
    await deleteAll(tableName);
};
