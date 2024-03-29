import { BatchWriteItemCommand, WriteRequest } from '@aws-sdk/client-dynamodb';
import { BatchWriteItemCommandInput } from '@aws-sdk/client-dynamodb/dist-types/commands/BatchWriteItemCommand';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { marshall } from '@aws-sdk/util-dynamodb';
import { dynamoDocClient, MAX_NUMBER_OF_ITEMS_DYNAMO_DB } from '/opt/nodejs/aws.constants';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { sliceIntoChunks } from '/opt/nodejs/utils/array.utils';

export const getItem = async <T>(
    tableName: string,
    params: GetCommandInput
): Promise<T> => {
    try {
        console.log(
            `fetching data from DynamoDB for table ${tableName} and params ${JSON.stringify(
                params
            )}`
        );
        const { Item } = await dynamoDocClient.send(new GetCommand(params));
        console.log(`successfully fetched data for table ${tableName}`);
        return Item as T;
    } catch (err) {
        console.error(err);
        const message = 'Error fetching data from DynamoDB';
        console.error(message);
        throw new Error(message);
    }
};

export const fetch = async <T>(tableName: string): Promise<T> => {
    try {
        console.log(`fetching data from DynamoDB for table ${tableName}`);
        const { Items } = await dynamoDocClient.scan({ TableName: tableName });
        console.log(`successfully fetched data for table ${tableName}`);
        return Items[0] as T;
    } catch (err) {
        console.error(err);
        const message = 'Error fetching data from DynamoDB';
        console.error(message);
        throw new Error(message);
    }
};

export const query = async <T>(args: any): Promise<T[]> => {
    try {
        console.log(`fetching data from DynamoDB for table ${args.TableName}`);
        const { Items } = await dynamoDocClient.query(args);
        console.log(`successfully fetched data for table ${args.TableName}`);
        return Items as T[];
    } catch (err) {
        console.error(err);
        const message = 'Error fetching data from DynamoDB';
        console.error(message);
        throw new Error(message);
    }
};

// export const fetchAll = async <T>(tableName: string): Promise<T[]> => {
//     try {
//         console.log(`fetching data from DynamoDB for table ${tableName}`);
//         const response = await dynamoDocClient.scan({ TableName: tableName });
//         console.log(`successfully fetched data for table ${tableName}`);
//         console.log(`Response: ${JSON.stringify(response)}`);
//         return response.Items as T[];
//     } catch (err) {
//         console.error(err);
//         const message = 'Error fetching data from DynamoDB';
//         console.error(message);
//         throw new Error(message);
//     }
// };
export const fetchAll = async <T>(tableName: string): Promise<T[]> => {
    try {
        let lastEvaluatedKey = null;
        let items = [];

        // DynamoDB has a call limit of 1MB. If we want to load all data we need to do this sequentially
        while (true) {
            let response;
            if (lastEvaluatedKey === null) {
                response = await dynamoDocClient.scan({ TableName: tableName }); // This only runs the first time - provide no ExclusiveStartKey initially
            } else {
                response = await dynamoDocClient.scan({ TableName: tableName, ExclusiveStartKey: lastEvaluatedKey });
            }

            items.push(...response.Items); // Appending to our resultset list

            // Set our lastEvaluatedKey to the value for next operation,
            // else, there's no more results and we can exit
            if (!!response.LastEvaluatedKey) {
                console.log(`getting lastEvaluatedKey: ${JSON.stringify(response.LastEvaluatedKey)}`);
                lastEvaluatedKey = response.LastEvaluatedKey;
            } else {
                console.log(`successfully fetched data for table ${tableName}`);
                return items as T[];
            }
        }
    } catch (err) {
        console.error(err);
        const message = 'Error fetching data from DynamoDB';
        console.error(message);
        throw new Error(message);
    }
};

export const saveAll = async <T>(tableName: string, data: T[]) => {
    console.log(`saving all table data for ${tableName}`);

    const chunkedData = sliceIntoChunks(data, MAX_NUMBER_OF_ITEMS_DYNAMO_DB);

    for (const chunk of chunkedData) {
        const putRequests: WriteRequest[] = prepareWriteRequest(chunk);
        await syncToDatabase(tableName, putRequests);
    }
};

export const deleteAll = async (tableName: string) => {
    console.log(`deleting all table data for ${tableName}`);
    // Use the scan method to retrieve all items in the table
    const data = await fetchAll<BaseModel>(tableName);
    console.log(`deleting ${data.length} number of items for ${tableName}`);

    const chunkedData = sliceIntoChunks(data, MAX_NUMBER_OF_ITEMS_DYNAMO_DB);

    for (const chunk of chunkedData) {
        const deleteRequests: WriteRequest[] = prepareDeleteRequest(chunk);
        await syncToDatabase(tableName, deleteRequests);
    }
    console.log(`successfully deleted all table data for ${tableName}`);
};

const syncToDatabase = async <T>(
    tableName: string,
    requests: WriteRequest[]
) => {
    const params: BatchWriteItemCommandInput = {
        RequestItems: {
            [tableName]: requests
        }
    };

    const command = new BatchWriteItemCommand(params);

    try {
        console.log('sending chunk of data to DynamoDB');
        await dynamoDocClient.send(command);
        console.log('successfully sent chunk of data to DynamoDB');
    } catch (err) {
        console.error(err);
        const message = 'Error sending data to DynamoDB';
        console.error(message);
        throw new Error(message);
    }
};

const prepareWriteRequest = <T>(data: T[]): WriteRequest[] => {
    return data.map((entry) => ({
        PutRequest: {
            Item: marshall(entry, { removeUndefinedValues: true })
        }
    }));
};

const prepareDeleteRequest = <T extends BaseModel>(
    data: T[]
): WriteRequest[] => {
    return data.map((entry) => ({
        DeleteRequest: {
            Key: {
                id: { S: entry.id }
            }
        }
    }));
};
