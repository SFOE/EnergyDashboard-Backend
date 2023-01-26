import { fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { createId, FuellstandGasspeicher } from '/opt/nodejs/models/fuellstand-gasspeicher.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.FUELLSTAND_GASSPEICHER]);

export const fetchAllFuellstandGasspeicher = async (): Promise<FuellstandGasspeicher[]> => {
    return fetchAll(tableName);
}

export const findFuellstandGasspeicherByRegionAndMonthAndDay = async (region: string, month: number, day: number): Promise<FuellstandGasspeicher> => {
    const id = createId(region, month.toString(), day.toString());
    const params: GetCommandInput = {
        TableName: tableName,
        Key: {
            id: id,
        },
    };

    return getItem(tableName, params);
}

export const saveAllFuellstandGasspeicher = async (data: FuellstandGasspeicher[]) => {
    await saveAll(tableName, data);
}

