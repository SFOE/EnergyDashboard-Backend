import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromImportExportNetto } from '/opt/nodejs/models/strom-import-export-netto.model';
import { StromProduktionsMix } from '/opt/nodejs/models/strom-produktionsmix.model';
import {
    StromVerbrauchEndverbrauchSourceV2,
    StromVerbrauchEndverbrauchV2,
} from '/opt/nodejs/models/strom-verbrauch-endverbrauch-v2.model';
import { StromVerbrauchEndverbrauch } from '/opt/nodejs/models/strom-verbrauch-endverbrauch.model';
import { StromVerbrauchHistoricalValue } from '/opt/nodejs/models/strom-verbrauch-historical-values.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_ENDVERBRAUCH_V2]);

export const fetchAllStromVerbrauchEndverbrauchV2 = async (): Promise<StromVerbrauchEndverbrauchV2[]> => {
    return fetchAll(tableName);
}

export const saveAllStromVerbrauchEndverbrauchV2 = async (data: StromVerbrauchEndverbrauchV2[]) => {
    await saveAll(tableName, data);
}


export const deleteAllStromVerbrauchEndverbrauchV2 = async () => {
    await deleteAll(tableName);
}
