import { deleteAll, query, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { StromKkwVerfuegbarkeit } from '/opt/nodejs/models/strom/strom-kkw-verfuegbarkeit.model';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_KKW_PRODUKTION_VERFUEGBARKEIT]
);

export const fetchAllStromKkwVerfuegbarkeitCh = async (): Promise<
    StromKkwVerfuegbarkeit[]
> => {
    return query({
        TableName: tableName,
        IndexName: 'country-index',
        KeyConditionExpression: 'country = :country',
        ExpressionAttributeValues: {
            ':country': 'ch'
        }
    });
};

export const fetchAllStromKkwVerfuegbarkeitFr = async (): Promise<
    StromKkwVerfuegbarkeit[]
> => {
    return query({
        TableName: tableName,
        IndexName: 'country-index',
        KeyConditionExpression: 'country = :country',
        ExpressionAttributeValues: {
            ':country': 'fr'
        }
    });
};

export const deleteAllStromKkwVerfuegbarkeit = async () => {
    await deleteAll(tableName);
};

export const saveStromKkwVerfuegbarkeit = async (data: StromKkwVerfuegbarkeit[]) => {
    await saveAll(tableName, data);
};
