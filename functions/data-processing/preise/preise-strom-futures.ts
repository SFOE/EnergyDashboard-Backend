import { Context, S3Event } from 'aws-lambda';
import { deleteAllPreiseStromFutures, saveAllPreiseStromFutures } from '/opt/nodejs/db/preise/preise-strom-futures.db';
import {
    map,
    PreiseStromFuturesSource
} from '/opt/nodejs/models/preise/preise-strom-futures.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseStromFutures();
};

const processPreiseStromFutures = async () => {
    const records = await getCSVFileFromS3<PreiseStromFuturesSource>(
        SourceFiles.PREISE_STROM_FUTURES
    );
    const data = map(records);
    
    await deleteAllPreiseStromFutures();
    await saveAllPreiseStromFutures(data);
};
