import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    deleteAllWetterHeizgradtageZeitreihe,
    saveAllWetterHeizgradtageZeitreihe
} from '/opt/nodejs/db/wetter/wetter-heizgradtage-zeitreihe.db';
import {
    map,
    WetterHeizgradtageTrendSource
} from '/opt/nodejs/models/wetter/wetter-heizgradtage-trend.model';
import {
    deleteAllWetterHeizgradtageTrend,
    saveAllWetterHeizgradtageTrend
} from '/opt/nodejs/db/wetter/wetter-heizgradtage-trend.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterHeizgradtageTrend();
};

const processWetterHeizgradtageTrend = async () => {
    const sources = await getCSVFileFromS3<WetterHeizgradtageTrendSource>(
        SourceFiles.WETTER_HEIZGRADTAGE_TREND
    );

    const entries = map(sources);

    console.log('Deleting all Wetter Heizgradtage Trend');
    await deleteAllWetterHeizgradtageTrend();

    console.log('Saving all Wetter Heizgradtage Trend');
    await saveAllWetterHeizgradtageTrend(entries);
};
