import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllWetterTemperaturTrendV2,
    saveWetterTemperaturTrendV2
} from '/opt/nodejs/db/wetter/wetter-temperatur-trend-v2.db';
import { map, WetterTemperaturTrendSourceV2 } from '/opt/nodejs/models/wetter/wetter-temperatur-trend-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterTemperaturTrend();
};

const processWetterTemperaturTrend = async () => {
    const sources = await getCSVFileFromS3<WetterTemperaturTrendSourceV2>(
        SourceFiles.WETTER_TEMPERATUR_TREND_V2
    );

    validateSources(sources);

    const entries = map(sources[0]);
    console.log(`entries: ${JSON.stringify(entries)}`);

    await deleteAllWetterTemperaturTrendV2();
    await saveWetterTemperaturTrendV2(entries);
};

const validateSources = (sources: WetterTemperaturTrendSourceV2[]) => {
    if (!sources || sources.length > 1) {
        const errorMsg = `Sources for Wetter Temperatur Trend V2 contain more than one entry: ${JSON.stringify(
            sources
        )}`;
        console.log(errorMsg);
        throw new Error(errorMsg);
    }
};
