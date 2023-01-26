import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SparzielAktuelleEinsparung } from '/opt/nodejs/models/sparziel-aktuelle-einsparung.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG]);

export const fetchAllStromSparzielAktuelleEinsparung = async (): Promise<SparzielAktuelleEinsparung[]> => {
    return fetchAll(tableName);
}

export const deleteAllStromSparzielAktuelleEinsparung = async () => {
    await deleteAll(tableName);
}

export const saveStromSparzielAktuelleEinsparung = async (data: SparzielAktuelleEinsparung[]) => {
    await saveAll(tableName, data);
}
