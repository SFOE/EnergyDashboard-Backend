import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import {
    StromSparziel5ProzentEinsparungen
} from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-einsparungen.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_SPARZIEL_5_PROZENT_EINSPARUNGEN]);

export const fetchStromSparziel5ProzentEinsparungen = async (): Promise<StromSparziel5ProzentEinsparungen> => {
    const allEntries = await fetchAll<StromSparziel5ProzentEinsparungen>(tableName);
    return allEntries[allEntries.length - 1];
};

export const deleteAllStromSparziel5ProzentEinsparungen = async () => {
    await deleteAll(tableName);
};

export const saveStromSparziel5ProzentEinsparungen = async (data: StromSparziel5ProzentEinsparungen) => {
    await saveAll(tableName, [data]);
};
