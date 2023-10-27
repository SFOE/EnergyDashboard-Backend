import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map, WetterHeizgradtageZeitreiheSource } from '/opt/nodejs/models/wetter/wetter-heizgradtage-zeitreihe.model';
import {
    deleteAllWetterHeizgradtageZeitreihe,
    saveAllWetterHeizgradtageZeitreihe
} from '/opt/nodejs/db/wetter/wetter-heizgradtage-zeitreihe.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterHeizgradtageZeitreihe();
};

const processWetterHeizgradtageZeitreihe = async () => {
    const sources = await getCSVFileFromS3<WetterHeizgradtageZeitreiheSource>(
        SourceFiles.WETTER_HEIZGRADTAGE_ZEITREIHE
    );

    const entries = map(sources);

    console.log('Deleting all Wetter Heizgradtage Zeitreihe');
    await deleteAllWetterHeizgradtageZeitreihe();

    console.log('Saving all Wetter Heizgradtage Zeitreihe');
    await saveAllWetterHeizgradtageZeitreihe(entries);
};
