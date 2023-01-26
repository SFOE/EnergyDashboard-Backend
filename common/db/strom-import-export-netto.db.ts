import { fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportNetto } from '/opt/nodejs/models/strom-import-export-netto.model';
import { StromProduktionImportVerbrauch } from '/opt/nodejs/models/strom-produktion-import-verbrauch.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_IMPORT_EXPORT_NETTO]);

export const fetchAllStromImportExportNetto = async (): Promise<StromImportExportNetto[]> => {
    return fetchAll(tableName);
}

export const saveAllStromImportExportNetto = async (data: StromImportExportNetto[]) => {
    await saveAll(tableName, data);
}

