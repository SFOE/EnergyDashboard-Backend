import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { StromProduktionPvTrend } from '/opt/nodejs/models/strom/strom-produktion-pv-trend.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_PRODUKTION_PV_TREND]
);

export const fetchAllStromProduktionPvTrend = async (): Promise<
    StromProduktionPvTrend[]
> => {
    return fetchAll(tableName);
};

export const fetchMostRecentStromProduktionPvTrend =
    async (): Promise<StromProduktionPvTrend> => {
        const allEntries = await fetchAllStromProduktionPvTrend();

        return allEntries
            .sort(dateSortFn)
            .slice()
            .reverse()
            .find((entry) => entry.stromProduktion !== null);
    };

export const saveAllStromProduktionPvTrend = async (
    data: StromProduktionPvTrend[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromProduktionPvTrend = async () => {
    await deleteAll(tableName);
};
