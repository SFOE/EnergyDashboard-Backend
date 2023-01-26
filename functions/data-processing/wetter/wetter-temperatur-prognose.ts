import { saveAllWetterTemperaturPrognose } from '/opt/nodejs/db/wetter-temperatur-prognose.db';
import { map, WetterTemperaturPrognoseSource } from '/opt/nodejs/models/wetter-temperatur-prognose.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterTemperaturPrognose();
};

const processWetterTemperaturPrognose = async () => {
    const sources = await getCSVFileFromS3<WetterTemperaturPrognoseSource>(SourceFiles.WETTER_TEMPERATUR_PROGNOSE);
    const entries = map(sources);
    console.log(`entries: ${JSON.stringify(entries)}`);

    await saveAllWetterTemperaturPrognose(entries);
}

