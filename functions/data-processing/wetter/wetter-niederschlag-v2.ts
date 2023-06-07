import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    deleteAllWetterNiederschlagV2,
    saveAllWetterNiederschlagV2
} from '/opt/nodejs/db/wetter/wetter-niederschlag-v2.db';
import { map, WetterNiederschlagSourceV2 } from '/opt/nodejs/models/wetter/wetter-niederschlag-v2.model';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterNiederschlagV2();
};

const processWetterNiederschlagV2 = async () => {
    const sources = await getCSVFileFromS3<WetterNiederschlagSourceV2>(
        SourceFiles.WETTER_NIEDERSCHLAG_V2
    );

    const entries = map(sources);

    console.log('Deleting all Wetter Niederschlag V2');
    await deleteAllWetterNiederschlagV2();

    console.log('Saving all Wetter Niederschlag V2');
    await saveAllWetterNiederschlagV2(entries);
};
