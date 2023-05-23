import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map, WetterSchneereservenSource } from '/opt/nodejs/models/wetter/wetter-schneereserven.model';
import {
    deleteAllWetterSchneereserven,
    saveAllWetterSchneereserven
} from '/opt/nodejs/db/wetter/wetter-schneereserven.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterSchneereserven();
};

const processWetterSchneereserven = async () => {
    const sources = await getCSVFileFromS3<WetterSchneereservenSource>(
        SourceFiles.WETTER_SCHNEERESERVEN
    );

    const entries = map(sources);

    console.log('Deleting all Wetter Schneereserven');
    await deleteAllWetterSchneereserven();

    console.log('Saving all Wetter Schneereserven');
    await saveAllWetterSchneereserven(entries);
};
