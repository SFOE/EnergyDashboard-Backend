import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllPreiseGasFutures,
    saveAllPreiseGasFutures
} from '/opt/nodejs/db/preise/preise-gas-futures.db';
import {
    map,
    PreiseGasFuturesSource
} from '/opt/nodejs/models/preise/preise-gas-futures.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseGasFutures();
};

const processPreiseGasFutures = async () => {
    const records = await getCSVFileFromS3<PreiseGasFuturesSource>(
        SourceFiles.PREISE_GAS_FUTURES
    );
    const data = map(records);

    await deleteAllPreiseGasFutures();
    await saveAllPreiseGasFutures(data);
};
