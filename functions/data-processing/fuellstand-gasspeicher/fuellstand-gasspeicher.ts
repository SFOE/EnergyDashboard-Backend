import { saveAllFuellstandGasspeicher } from '/opt/nodejs/db/fuellstand-gasspeicher.db';
import { FuellstandGasspeicherSource, map } from '/opt/nodejs/models/fuellstand-gasspeicher.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processFuellstandGasspeicher();
};

const processFuellstandGasspeicher = async () => {
    const records = await getCSVFileFromS3<FuellstandGasspeicherSource>(SourceFiles.FUELLSTAND_GASSPEICHER);
    const data = map(records);
    await saveAllFuellstandGasspeicher(data);
}


