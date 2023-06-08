import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    StromVerbrauchLandesverbrauchVergleichV2
} from '/opt/nodejs/models/strom/strom-verbrauch-landesverbrauch-vergleich-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_VERGLEICH_V2]);

export const fetchAllStromVerbrauchLandesverbrauchVergleichV2 = async (): Promise<StromVerbrauchLandesverbrauchVergleichV2[]> => {
    return fetchAll(tableName);
};

export const saveAllStromVerbrauchLandesverbrauchVergleichV2 = async (data: StromVerbrauchLandesverbrauchVergleichV2[]) => {
    await saveAll(tableName, data);
};

export const deleteAllStromVerbrauchLandesverbrauchVergleichV2 = async () => {
    await deleteAll(tableName);
}
