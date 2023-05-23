import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SparzielAktuelleEinsparungV4 } from '/opt/nodejs/models/sparziel-aktuelle-einsparung-v4.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG_V4]
);

export const fetchAllGasSparzielAktuelleEinsparungV4 = async (): Promise<
    SparzielAktuelleEinsparungV4[]
> => {
    return fetchAll(tableName);
};

export const deleteAllGasSparzielAktuelleEinsparungV4 = async () => {
    await deleteAll(tableName);
};

export const saveGasSparzielAktuelleEinsparungV4 = async (
    data: SparzielAktuelleEinsparungV4[]
) => {
    await saveAll(tableName, data);
};
