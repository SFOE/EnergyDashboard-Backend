import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    StromWinterproduktionTrendSource,
    map,
    StromWinterproduktionTrend
} from '/opt/nodejs/models/strom/strom-winterproduktion-trend.model';
import {
    deleteAllStromWinterproduktionTrend,
    saveAllStromWinterproduktionTrend
} from '/opt/nodejs/db/strom/strom-winterproduktion-trend.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromWinterproduktionTrend();
};

const processStromWinterproduktionTrend = async (): Promise<void> => {
    const sources: StromWinterproduktionTrendSource[] =
        await getCSVFileFromS3<StromWinterproduktionTrendSource>(
            SourceFiles.STROM_WINTERPRODUKTION_TREND
        );

    const entries: StromWinterproduktionTrend[] = map(sources);

    console.log('Deleting all Strom Winterproduktion Trend');
    await deleteAllStromWinterproduktionTrend();

    console.log('Saving all Strom Winterproduktion Trend');
    await saveAllStromWinterproduktionTrend(entries);
};
