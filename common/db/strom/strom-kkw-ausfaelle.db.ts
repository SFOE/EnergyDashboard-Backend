import { deleteAll, query, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromKkwAusfallV1 } from '/opt/nodejs/models/strom/strom-kkw-ausfall.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_KKW_PRODUKTION_AUSFAELLE_V1]
);

export const fetchAllStromKkwAusfaelleCh = async (): Promise<
    StromKkwAusfallV1[]
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

export const fetchAllStromKkwAusfaelleFr = async (): Promise<
    StromKkwAusfallV1[]
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

export const deleteAllStromKkwAusfaelle = async () => {
    await deleteAll(tableName);
};

export const saveStromKkwAusfaelle = async (data: StromKkwAusfallV1[]) => {
    await saveAll(tableName, data);
};
