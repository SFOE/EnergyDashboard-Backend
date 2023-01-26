import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SparzielAktuelleEinsparung } from '/opt/nodejs/models/sparziel-aktuelle-einsparung.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG_V2]);

export const fetchAllGasSparzielAktuelleEinsparungV2 = async (): Promise<SparzielAktuelleEinsparung[]> => {
    return fetchAll(tableName);
}

export const deleteAllGasSparzielAktuelleEinsparungV2 = async () => {
    await deleteAll(tableName);
}

export const saveGasSparzielAktuelleEinsparungV2 = async (data: SparzielAktuelleEinsparung[]) => {
    await saveAll(tableName, data);
}
