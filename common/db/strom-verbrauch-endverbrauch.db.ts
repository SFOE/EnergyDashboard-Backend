import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportNetto } from '/opt/nodejs/models/strom-import-export-netto.model';
import { StromProduktionsMix } from '/opt/nodejs/models/strom-produktionsmix.model';
import { StromVerbrauchEndverbrauch } from '/opt/nodejs/models/strom-verbrauch-endverbrauch.model';
import { StromVerbrauchHistoricalValue } from '/opt/nodejs/models/strom-verbrauch-historical-values.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_ENDVERBRAUCH]);

export const fetchAllStromVerbrauchEndverbrauch = async (): Promise<StromVerbrauchEndverbrauch[]> => {
    return fetchAll(tableName);
}

export const saveAllStromVerbrauchEndverbrauch = async (data: StromVerbrauchEndverbrauch[]) => {
    await saveAll(tableName, data);
}

