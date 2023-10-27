import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterHeizgradtageZeitreihe } from '/opt/nodejs/models/wetter/wetter-heizgradtage-zeitreihe.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_HEIZGRADTAGE_ZEITREIHE]
);

export const fetchAllWetterHeizgradtageZeitreihe = async (): Promise<
    WetterHeizgradtageZeitreihe[]
> => {
    return fetchAll(tableName);
};

export const saveAllWetterHeizgradtageZeitreihe = async (
    data: WetterHeizgradtageZeitreihe[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterHeizgradtageZeitreihe = async () => {
    await deleteAll(tableName);
};
