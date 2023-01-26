import { Aws } from '/opt/nodejs/aws.constants';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { parse } from 'csv-parse/sync';

export const getCSVFileFromS3 = async <T>(fileName: string): Promise<T[]> => {
    const body = await getFileFromS3Bucket(fileName);
    const records: T[] = parse(body, {
        columns: true,
        delimiter: ',',
        skip_empty_lines: true,
    })

    console.log(`records: ${JSON.stringify(records)}`);

    return records;
}

export const getJSONFileFromS3 = async <T>(fileName: string): Promise<T> => {
    const body = await getFileFromS3Bucket(fileName);
    return JSON.parse(body);
}

const getFileFromS3Bucket = async (fileName: string): Promise<string> => {
    const client = new S3Client({ region: Aws.region });

    const bucket = Aws.s3RawDataBucketName;

    console.log(`bucket: ${bucket}, key: ${fileName}`);
    const params = {
        Bucket: bucket,
        Key: fileName,
    };

    try {
        const command = new GetObjectCommand(params);
        const { Body } = await client.send(command);

        const body = await Body.transformToString();
        console.log(`body: ${body}`);

        return body;
    } catch (err) {
        console.error(err);
        const message = `Error getting object ${fileName} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function and the lambda function has the proper permissions`;
        console.error(message);
        throw new Error(message);
    }
}
