import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllPreiseGasDayahead,
    saveAllPreiseGasDayahead
} from '/opt/nodejs/db/preise/preise-gas-dayahead.db';
import {
    map,
    PreiseGasDayaheadSource
} from '/opt/nodejs/models/preise/preise-gas-dayahead.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseGasDayahead();
};

const processPreiseGasDayahead = async () => {
    const records = await getCSVFileFromS3<PreiseGasDayaheadSource>(
        SourceFiles.PREISE_GAS_DAYAHEAD
    );
    const data = map(records);

    await deleteAllPreiseGasDayahead();
    await saveAllPreiseGasDayahead(data);
};
