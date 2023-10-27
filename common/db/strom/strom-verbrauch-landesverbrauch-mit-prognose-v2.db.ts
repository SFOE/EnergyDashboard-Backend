import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    StromVerbrauchLandesverbrauchMitPrognoseV2
} from '/opt/nodejs/models/strom/strom-verbrauch-landesverbrauch-mit-prognose-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { findEntryByDate } from '/opt/nodejs/utils/date.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_MIT_PROGNOSE_V2]);

export const fetchAllStromVerbrauchLandesverbrauchMitPrognoseV2 = async (): Promise<StromVerbrauchLandesverbrauchMitPrognoseV2[]> => {
    return fetchAll(tableName);
};

export const fetchStromVerbrauchLandesverbrauchMitPrognoseV2ByDate = async (date: Date): Promise<StromVerbrauchLandesverbrauchMitPrognoseV2> => {
    const allEntries = await fetchAll<StromVerbrauchLandesverbrauchMitPrognoseV2>(
        tableName
    );
    return findEntryByDate(allEntries, date);
};

export const saveAllStromVerbrauchLandesverbrauchMitPrognoseV2 = async (data: StromVerbrauchLandesverbrauchMitPrognoseV2[]) => {
    await saveAll(tableName, data);
};

export const deleteAllStromVerbrauchLandesverbrauchMitPrognoseV2 = async () => {
    await deleteAll(tableName);
};

