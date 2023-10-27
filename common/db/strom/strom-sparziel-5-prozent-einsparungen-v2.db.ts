import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { StromSparziel5ProzentEinsparungenV2 } from '../../models/strom/strom-sparziel-5-prozent-einsparungen-v2.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_SPARZIEL_5_PROZENT_EINSPARUNGEN_V2]
);

export const fetchStromSparziel5ProzentEinsparungenV2 =
    async (): Promise<StromSparziel5ProzentEinsparungenV2> => {
        const allEntries = await fetchAll<StromSparziel5ProzentEinsparungenV2>(
            tableName
        );
        return allEntries[allEntries.length - 1];
    };

export const deleteAllStromSparziel5ProzentEinsparungenV2 = async () => {
    await deleteAll(tableName);
};

export const saveStromSparziel5ProzentEinsparungenV2 = async (
    data: StromSparziel5ProzentEinsparungenV2
) => {
    await saveAll(tableName, [data]);
};
