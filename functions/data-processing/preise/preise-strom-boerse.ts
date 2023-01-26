import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseStromBoerse } from '/opt/nodejs/db/preise/preise-strom-boerse.db';
import {
    map,
    PreiseStromBoerseSource
} from '/opt/nodejs/models/preise/preise-strom-boerse.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseStromBoerse();
};

const processPreiseStromBoerse = async () => {
    const records = await getCSVFileFromS3<PreiseStromBoerseSource>(
        SourceFiles.PREISE_STROM_BOERSE
    );
    const data = map(records);
    await saveAllPreiseStromBoerse(data);
};
