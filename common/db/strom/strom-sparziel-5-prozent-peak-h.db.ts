import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { StromSparziel5ProzentPeakH } from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-peak-h.model';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_SPARZIEL_5_PROZENT_PEAK_H]);

export const fetchAllStromSparziel5ProzentPeakH = async (): Promise<StromSparziel5ProzentPeakH[]> => {
    return fetchAll<StromSparziel5ProzentPeakH>(tableName);
};

export const deleteAllStromSparziel5ProzentPeakH = async () => {
    await deleteAll(tableName);
};

export const saveStromSparziel5ProzentPeakH = async (data: StromSparziel5ProzentPeakH[]) => {
    await saveAll(tableName, data);
};
