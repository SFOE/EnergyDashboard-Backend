import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromVerbrauchLandesverbrauch } from '/opt/nodejs/models/strom-verbrauch-landesverbrauch.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH]);

export const fetchAllStromVerbrauchLandesverbrauch = async (): Promise<StromVerbrauchLandesverbrauch[]> => {
    return fetchAll(tableName);
}

export const saveAllStromVerbrauchLandesverbrauch = async (data: StromVerbrauchLandesverbrauch[]) => {
    await saveAll(tableName, data);
}

