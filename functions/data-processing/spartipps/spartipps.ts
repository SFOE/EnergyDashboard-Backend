import { saveAllSpartipps } from '/opt/nodejs/db/spartipps.db';
import { map, SpartippsSource } from '/opt/nodejs/models/spartipps.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3, getJSONFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processSpartipps();
};

const processSpartipps = async () => {
    const spartippsSources = await getCSVFileFromS3<SpartippsSource>(SourceFiles.SPARTIPPS);
    const spartipps = map(spartippsSources);
    console.log(`spartipps: ${JSON.stringify(spartipps)}`);

    await saveAllSpartipps(spartipps);
}

