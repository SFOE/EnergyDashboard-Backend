import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromWinterproduktionTrend } from '/opt/nodejs/models/strom/strom-winterproduktion-trend.model';

const tableName: string = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_WINTERPRODUKTION_TREND]
);

export const fetchAllStromWinterproduktionTrend = async (): Promise<
    StromWinterproduktionTrend[]
> => {
    return fetchAll(tableName);
};

export const fetchMostRecentStromWinterproduktionTrend =
    async (): Promise<StromWinterproduktionTrend> => {
        const allEntries: StromWinterproduktionTrend[] =
            await fetchAllStromWinterproduktionTrend();

        return allEntries.find(
            (entry: StromWinterproduktionTrend): boolean =>
                entry.importe !== null
        );
    };

export const saveAllStromWinterproduktionTrend = async (
    data: StromWinterproduktionTrend[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllStromWinterproduktionTrend = async () => {
    await deleteAll(tableName);
};
