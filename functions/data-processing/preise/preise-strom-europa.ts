import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    PreiseStromEuropaSource,
    map
} from '/opt/nodejs/models/preise/preise-strom-europa.model';
import {
    deleteAllPreiseStromEuropa,
    saveAllPreiseStromEuropa
} from '/opt/nodejs/db/preise/preise-strom-europa.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseStromEuropa();
};

const processPreiseStromEuropa = async () => {
    const records = await getCSVFileFromS3<PreiseStromEuropaSource>(
        SourceFiles.PREISE_STROM_EUROPA
    );

    const data = map(records);

    await deleteAllPreiseStromEuropa();
    await saveAllPreiseStromEuropa(data);
};
