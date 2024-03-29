import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportUebersicht } from '/opt/nodejs/models/strom/strom-import-export-uebersicht.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_IMPORT_EXPORT_UEBERSICHT]
);

export const fetchAllStromImportExportUebersicht = async (): Promise<
    StromImportExportUebersicht[]
> => {
    return fetchAll(tableName);
};

export const findMostRecentStromImportExportUebersicht =
    async (): Promise<StromImportExportUebersicht> => {
        const records = await fetchAllStromImportExportUebersicht();

        return records
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find(
                (entry) => entry.importGWh !== null && entry.exportGWh !== null
            );
    };

export const saveAllStromImportExportUebersicht = async (
    data: StromImportExportUebersicht[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromImportExportUebersicht = async () => {
    await deleteAll(tableName);
};

