import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    StromProduktionPvTrendSource,
    map
} from '/opt/nodejs/models/strom/strom-produktion-pv-trend.model';
import {
    deleteAllStromProduktionPvTrend,
    saveAllStromProduktionPvTrend
} from '/opt/nodejs/db/strom/strom-produktion-pv-trend.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromProduktionPvTrend();
};

const processStromProduktionPvTrend = async () => {
    const sources = await getCSVFileFromS3<StromProduktionPvTrendSource>(
        SourceFiles.STROM_PRODUKTION_PV_TREND
    );

    const entries = map(sources);

    console.log('Deleting all Strom Produktion PV');
    await deleteAllStromProduktionPvTrend();

    console.log('Saving all Strom Produktion PV');
    await saveAllStromProduktionPvTrend(entries);
};
