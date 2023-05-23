import { Context, S3Event } from 'aws-lambda';
import { deleteAllPreiseGasBoerse, saveAllPreiseGasBoerse } from '/opt/nodejs/db/preise/preise-gas-boerse.db';
import { map, PreiseGasBoerseSource } from '/opt/nodejs/models/preise/preise-gas-boerse.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseGasBoerse();
};

const processPreiseGasBoerse = async () => {
    const records = await getCSVFileFromS3<PreiseGasBoerseSource>(
        SourceFiles.PREISE_GAS_BOERSE
    );
    const data = map(records);

    await deleteAllPreiseGasBoerse();
    await saveAllPreiseGasBoerse(data);
};
