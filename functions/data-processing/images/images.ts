import { Context, S3Event } from 'aws-lambda';
import { copyFileToNewS3Bucket } from '/opt/nodejs/storage/s3-requests';
import { Aws, ImageFolderInS3Bucket } from '/opt/nodejs/aws.constants';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const fileName = event.fileName;
    console.log(`Processing Image ${fileName}`);

    await processImage(fileName);
};

const processImage = async (fileName: string) => {
    const sourceBucket = Aws.s3RawDataBucketName;
    const targetBucket = Aws.s3ImageBucketName;

    const targetFileName = `${ImageFolderInS3Bucket}/${fileName}`;
    console.log(`Storing sourceImage ${fileName} to ${targetFileName}`);
    await copyFileToNewS3Bucket(sourceBucket, targetBucket, fileName, targetFileName);
};
