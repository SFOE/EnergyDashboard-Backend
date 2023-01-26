import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SparzielAktuelleEinsparungV2V3 } from '/opt/nodejs/models/sparziel-aktuelle-einsparung-v2-v3.model';
import { SparzielAktuelleEinsparung } from '/opt/nodejs/models/sparziel-aktuelle-einsparung.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V2]);

export const fetchAllStromSparzielAktuelleEinsparungV2 = async (): Promise<SparzielAktuelleEinsparungV2V3[]> => {
    return fetchAll(tableName);
}

export const deleteAllStromSparzielAktuelleEinsparungV2 = async () => {
    await deleteAll(tableName);
}

export const saveStromSparzielAktuelleEinsparungV2 = async (data: SparzielAktuelleEinsparungV2V3[]) => {
    await saveAll(tableName, data);
}
