import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseTreibstoffDiesel } from '/opt/nodejs/db/preise/preise-treibstoff-diesel.db';
import {
    map,
    PreiseTreibstoffDieselSource
} from '/opt/nodejs/models/preise/preise-treibstoff-diesel.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseTreibstoffDiesel();
};

const processPreiseTreibstoffDiesel = async () => {
    const records = await getCSVFileFromS3<PreiseTreibstoffDieselSource>(
        SourceFiles.PREISE_TREIBSTOFF_DIESEL
    );
    const data = map(records);
    await saveAllPreiseTreibstoffDiesel(data);
};
