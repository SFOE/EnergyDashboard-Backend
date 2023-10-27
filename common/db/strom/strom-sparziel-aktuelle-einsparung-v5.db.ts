import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SparzielAktuelleEinsparungV5 } from '/opt/nodejs/models/sparziel/sparziel-aktuelle-einsparung-v5.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V5]
);

export const fetchAllStromSparzielAktuelleEinsparungV5 = async (): Promise<
    SparzielAktuelleEinsparungV5[]
> => {
    return fetchAll(tableName);
};

export const deleteAllStromSparzielAktuelleEinsparungV5 = async () => {
    await deleteAll(tableName);
};

export const saveStromSparzielAktuelleEinsparungV5 = async (
    data: SparzielAktuelleEinsparungV5[]
) => {
    await saveAll(tableName, data);
};
