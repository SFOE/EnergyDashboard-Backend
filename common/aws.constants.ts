import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

export const Aws = {
    s3RawDataBucketName: process.env.S3_BUCKET,
    s3ImageBucketName: process.env.S3_IMAGE_BUCKET,
    region: 'eu-central-1'
};

export const ImageFolderInS3Bucket = 'images';

const dynamoDbConfiguration = { region: Aws.region };

export const MAX_NUMBER_OF_ITEMS_DYNAMO_DB = 25;

const dynamoDBClient = new DynamoDBClient(dynamoDbConfiguration);
export const dynamoDocClient = DynamoDBDocument.from(dynamoDBClient);

