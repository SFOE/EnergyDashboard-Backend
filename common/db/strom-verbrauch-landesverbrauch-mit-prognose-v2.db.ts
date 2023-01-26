import { deleteAll, fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    createId,
    StromVerbrauchLandesverbrauchMitPrognoseV2,
} from '/opt/nodejs/models/strom-verbrauch-landesverbrauch-mit-prognose-v2.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_MIT_PROGNOSE_V2]);

export const fetchAllStromVerbrauchLandesverbrauchMitPrognoseV2 = async (): Promise<StromVerbrauchLandesverbrauchMitPrognoseV2[]> => {
    return fetchAll(tableName);
}

export const findStromVerbrauchLandesverbrauchMitPrognoseV2ByDate = async (date: string): Promise<StromVerbrauchLandesverbrauchMitPrognoseV2> => {
    const id = createId(date);
    const params: GetCommandInput = {
        TableName: tableName,
        Key: {
            id: id,
        },
    };

    return getItem(tableName, params);
}

export const saveAllStromVerbrauchLandesverbrauchMitPrognoseV2 = async (data: StromVerbrauchLandesverbrauchMitPrognoseV2[]) => {
    await saveAll(tableName, data);
}

export const deleteAllStromVerbrauchLandesverbrauchMitPrognoseV2 = async () => {
    await deleteAll(tableName);
}

