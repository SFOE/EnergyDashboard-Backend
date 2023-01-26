import { saveAllFuellungsgradSpeicherseen } from '/opt/nodejs/db/fuellungsgrad-speicherseen.db';
import { FuellungsgradSpeicherseenSource, map } from '/opt/nodejs/models/fuellungsgrad-speicherseen.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processFuellungsgradSpeicherseen();
};

const processFuellungsgradSpeicherseen = async () => {
    const records = await getCSVFileFromS3<FuellungsgradSpeicherseenSource>(SourceFiles.FUELLUNGSGRAD_SPEICHERSEEN);
    const data = map(records);
    await saveAllFuellungsgradSpeicherseen(data);
}


