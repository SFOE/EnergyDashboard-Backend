import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map } from '/opt/nodejs/models/preise/preise-strom-europa-trend.model';
import { PreiseStromEuropaTrendSource } from '/opt/nodejs/models/preise/preise-strom-europa-trend.model';
import {
    deletePreiseStromEuropaTrend,
    savePreiseStromEuropaTrend
} from '/opt/nodejs/db/preise/preise-strom-europa-trend.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseStromEuropaTrend();
};

const processPreiseStromEuropaTrend = async () => {
    const records = await getCSVFileFromS3<PreiseStromEuropaTrendSource>(
        SourceFiles.PREISE_STROM_EUROPA_TREND
    );

    const data = map(records);

    await deletePreiseStromEuropaTrend();
    await savePreiseStromEuropaTrend(data);
};
