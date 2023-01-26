import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportNetto } from '/opt/nodejs/models/strom-import-export-netto.model';
import { StromProduktionsMix } from '/opt/nodejs/models/strom-produktionsmix.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_PRODUKTIONSMIX]);

export const fetchAllStromProduktionsMix = async (): Promise<StromProduktionsMix[]> => {
    return fetchAll(tableName);
}

export const saveAllStromProduktionsMix = async (data: StromProduktionsMix[]) => {
    await saveAll(tableName, data);
}

