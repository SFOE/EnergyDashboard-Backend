import { fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { createId, StromVerbrauchHistoricalValue } from '/opt/nodejs/models/strom-verbrauch-historical-values.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_VERBRAUCH_HISTORICAL_VALUES]);

export const fetchAllStromVerbrauchHistoricalValues = async (): Promise<StromVerbrauchHistoricalValue[]> => {
    return fetchAll(tableName);
}

export const findStromVerbrauchHistoricalValuesByMonthAndDay = async (month: number, day: number): Promise<StromVerbrauchHistoricalValue> => {
    const id = createId(month.toString(), day.toString());
    const params: GetCommandInput = {
        TableName: tableName,
        Key: {
            id: id,
        },
    };

    return getItem(tableName, params);
}

export const saveAllStromVerbrauchHistoricalValues = async (data: StromVerbrauchHistoricalValue[]) => {
    await saveAll(tableName, data);
}

