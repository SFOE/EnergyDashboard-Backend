import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportUebersicht } from '/opt/nodejs/models/strom-import-export-uebersicht.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_IMPORT_EXPORT_UEBERSICHT]);


export const fetchAllStromImportExportUebersicht = async (): Promise<StromImportExportUebersicht[]> => {
    return fetchAll(tableName);
}

export const findMostRecentStromImportExportUebersicht = async (): Promise<StromImportExportUebersicht> => {
    const records = await fetchAllStromImportExportUebersicht();

    return records
        .sort(sortFn)
        .slice()
        .reverse()
        .find(entry => entry.importGWh !== null && entry.exportGWh !== null);
}

const sortFn = (a: StromImportExportUebersicht, b: StromImportExportUebersicht) => new Date(a.datum).getTime() - new Date(b.datum).getTime();

export const saveAllStromImportExportUebersicht = async (data: StromImportExportUebersicht[]) => {
    await saveAll(tableName, data);
}

