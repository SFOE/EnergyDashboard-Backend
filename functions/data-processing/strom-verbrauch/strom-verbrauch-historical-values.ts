import { saveAllStromVerbrauchHistoricalValues } from '/opt/nodejs/db/strom-verbrauch-historical-values.db';
import { map, StromVerbrauchHistoricalValueSource } from '/opt/nodejs/models/strom-verbrauch-historical-values.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromVerbrauchHistoricalValues();
};

const processStromVerbrauchHistoricalValues = async () => {
    const records = await getCSVFileFromS3<StromVerbrauchHistoricalValueSource>(SourceFiles.STROM_VERBRAUCH_HISTORICAL_VALUES);
    const data = map(records);
    await saveAllStromVerbrauchHistoricalValues(data);
}

