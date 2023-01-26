import { saveWetterTemperaturTrend } from '/opt/nodejs/db/wetter-temperatur-trend.db';
import { map, WetterTemperaturTrendSource } from '/opt/nodejs/models/wetter-temperatur-trend.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterTemperaturTrend();
};

const processWetterTemperaturTrend = async () => {
    const sources = await getCSVFileFromS3<WetterTemperaturTrendSource>(SourceFiles.WETTER_TEMPERATUR_TREND);

    validateSources(sources);

    const entries = map(sources[0]);
    console.log(`entries: ${JSON.stringify(entries)}`);

    await saveWetterTemperaturTrend(entries);
}

const validateSources = (sources: WetterTemperaturTrendSource[]) => {
    if (!sources || sources.length > 1) {
        const errorMsg = `Sources for Wetter Temperatur Trend contain more than one entry: ${JSON.stringify(sources)}`;
        console.log(errorMsg);
        throw new Error(errorMsg);
    }
}
