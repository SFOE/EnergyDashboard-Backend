import { saveAllStromProduktionsMix } from '/opt/nodejs/db/strom-produktionsmix.db';
import { map, StromProduktionsMixSource } from '/opt/nodejs/models/strom-produktionsmix.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromProduktionsmix();
};

const processStromProduktionsmix = async () => {
    const records = await getCSVFileFromS3<StromProduktionsMixSource>(SourceFiles.STROM_PRODUKTIONSMIX);
    const data = map(records);
    await saveAllStromProduktionsMix(data);
}


