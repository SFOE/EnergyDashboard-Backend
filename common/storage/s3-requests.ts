import { Aws } from '/opt/nodejs/aws.constants';
import { CopyObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { parse } from 'csv-parse/sync';
import { Readable } from 'stream';
import { SdkStream } from '@aws-sdk/types';
import { CopyObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/CopyObjectCommand';

export const getCSVFileFromS3 = async <T>(fileName: string): Promise<T[]> => {
    const body = await getFileFromS3Bucket(fileName);
    const records: T[] = parse(body, {
        columns: true,
        delimiter: ',',
        skip_empty_lines: true
    });

    console.log(`records: ${JSON.stringify(records)}`);

    return records;
};

export const getJSONFileFromS3 = async <T>(fileName: string): Promise<T> => {
    const body = await getFileFromS3Bucket(fileName);
    return JSON.parse(body);
};

const getFileFromS3Bucket = async (fileName: string): Promise<string> => {
    try {
        const blob = await getFileFromS3BucketAsBlob(fileName);

        const body = blob.transformToString();
        console.log(`body: ${body}`);

        return body;
    } catch (err) {
        console.error(err);
        const message = `Error getting object ${fileName}. Make sure they exist and your bucket is in the same region as this function and the lambda function has the proper permissions`;
        console.error(message);
        throw new Error(message);
    }
};

const getFileFromS3BucketAsBlob = async (fileName: string): Promise<SdkStream<Readable | Blob | ReadableStream<any>>> => {
    const client = new S3Client({ region: Aws.region });

    const bucket = Aws.s3RawDataBucketName;

    console.log(`bucket: ${bucket}, key: ${fileName}`);
    const params = {
        Bucket: bucket,
        Key: fileName
    };

    try {
        const command = new GetObjectCommand(params);
        const { Body } = await client.send(command);

        return Body;
    } catch (err) {
        console.error(err);
        const message = `Error getting object ${fileName} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function and the lambda function has the proper permissions`;
        console.error(message);
        throw new Error(message);
    }
};

export const copyFileToNewS3Bucket = async (sourceBucket: string, targetBucket: string, sourceFileName: string, targetFileName): Promise<void> => {
    const client = new S3Client({ region: Aws.region });


    console.log(`sourceBucket: ${sourceBucket},targetBucket: ${targetBucket}, sourceFileName: ${sourceFileName}, targetFileName: ${targetFileName}`);
    const params: CopyObjectCommandInput = {
        CopySource: `${sourceBucket}/${sourceFileName}`,
        Bucket: targetBucket,
        Key: targetFileName
    };

    try {
        const command = new CopyObjectCommand(params);
        const response = await client.send(command);

        console.log(response);
    } catch (err) {
        console.error(err);
        const message = `Error putting object ${sourceFileName} from ${sourceBucket} to ${targetFileName} in ${targetBucket}. Make sure they exist and your bucket is in the same region as this function and the lambda function has the proper permissions`;
        console.error(message);
        throw new Error(message);
    }
};
