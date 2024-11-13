import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { StromProduktionPv } from '/opt/nodejs/models/strom/strom-produktion-pv.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_PRODUKTION_PV]
);

export const fetchAllStromProduktionPv = async (): Promise<
    StromProduktionPv[]
> => {
    return fetchAll(tableName);
};

export const fetchMostRecentStromProduktionPv =
    async (): Promise<StromProduktionPv> => {
        const allEntries = await fetchAllStromProduktionPv();

        return allEntries
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.stromProduktion !== null);
    };

export const saveAllStromProduktionPv = async (
    data: StromProduktionPv[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromProduktionPv = async () => {
    await deleteAll(tableName);
};
