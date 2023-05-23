import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map, WetterNiederschlagSource } from '/opt/nodejs/models/wetter/wetter-niederschlag.model';
import { deleteAllWetterNiederschlag, saveAllWetterNiederschlag } from '/opt/nodejs/db/wetter/wetter-niederschlag.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterNiederschlag();
};

const processWetterNiederschlag = async () => {
    const sources = await getCSVFileFromS3<WetterNiederschlagSource>(
        SourceFiles.WETTER_NIEDERSCHLAG
    );

    const entries = map(sources);

    console.log('Deleting all Wetter Niederschlag');
    await deleteAllWetterNiederschlag();

    console.log('Saving all Wetter Niederschlag');
    await saveAllWetterNiederschlag(entries);
};
