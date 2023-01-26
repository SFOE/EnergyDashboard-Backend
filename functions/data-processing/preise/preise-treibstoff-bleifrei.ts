import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseTreibstoffBleifrei } from '/opt/nodejs/db/preise/preise-treibstoff-bleifrei.db';
import {
    map,
    PreiseTreibstoffBleifreiSource
} from '/opt/nodejs/models/preise/preise-treibstoff-bleifrei.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseTreibstoffBleifrei();
};

const processPreiseTreibstoffBleifrei = async () => {
    const records = await getCSVFileFromS3<PreiseTreibstoffBleifreiSource>(
        SourceFiles.PREISE_TREIBSTOFF_BLEIFREI
    );
    const data = map(records);
    await saveAllPreiseTreibstoffBleifrei(data);
};
