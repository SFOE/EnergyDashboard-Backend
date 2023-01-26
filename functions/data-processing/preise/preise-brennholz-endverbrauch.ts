import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseBrennholzEndverbrauch } from '/opt/nodejs/db/preise/preise-brennholz-endverbrauch.db';
import {
    map,
    PreiseBrennholzEndverbrauchSource
} from '/opt/nodejs/models/preise/preise-brennholz-endverbrauch.model';

import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseBrennholzEndverbrauch();
};

const processPreiseBrennholzEndverbrauch = async () => {
    const records = await getCSVFileFromS3<PreiseBrennholzEndverbrauchSource>(
        SourceFiles.PREISE_BRENNHOLZ_ENDVERBRAUCH
    );
    const data = map(records);
    await saveAllPreiseBrennholzEndverbrauch(data);
};
