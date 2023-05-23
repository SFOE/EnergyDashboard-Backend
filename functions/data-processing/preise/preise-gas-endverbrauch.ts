import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllPreiseGasEndverbrauch,
    saveAllPreiseGasEndverbrauch
} from '/opt/nodejs/db/preise/preise-gas-endverbrauch.db';
import { map, PreiseGasEndverbrauchSource } from '/opt/nodejs/models/preise/preise-gas-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseGasEndverbrauch();
};

const processPreiseGasEndverbrauch = async () => {
    const records = await getCSVFileFromS3<PreiseGasEndverbrauchSource>(
        SourceFiles.PREISE_GAS_ENDVERBRAUCH
    );
    const data = map(records);

    await deleteAllPreiseGasEndverbrauch();
    await saveAllPreiseGasEndverbrauch(data);
};
