import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseStromEndverbrauch } from '/opt/nodejs/db/preise/preise-strom-endverbrauch.db';
import {
    map,
    PreiseStromEndverbrauchSource
} from '/opt/nodejs/models/preise/preise-strom-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseStromEndverbrauch();
};

const processPreiseStromEndverbrauch = async () => {
    const records = await getCSVFileFromS3<PreiseStromEndverbrauchSource>(
        SourceFiles.PREISE_STROM_ENDVERBRAUCH
    );
    const data = map(records);
    await saveAllPreiseStromEndverbrauch(data);
};
