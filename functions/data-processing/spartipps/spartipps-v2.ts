import { Context, S3Event } from 'aws-lambda';
import { deleteAllSpartippsV2, saveAllSpartippsV2 } from '/opt/nodejs/db/dashboard/spartipps-v2.db';
import { map, SpartippsSourceV2 } from '/opt/nodejs/models/dashboard/spartipps-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processSpartipps();
};

const processSpartipps = async () => {
    const spartippsSources = await getCSVFileFromS3<SpartippsSourceV2>(SourceFiles.SPARTIPPS_V2);
    const spartipps = map(spartippsSources);
    console.log(`spartipps: ${JSON.stringify(spartipps)}`);

    await deleteAllSpartippsV2();
    await saveAllSpartippsV2(spartipps);
}

