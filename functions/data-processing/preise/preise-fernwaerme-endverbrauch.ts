import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseFernwaermeEndverbrauch } from '/opt/nodejs/db/preise/preise-fernwaerme-endverbrauch.db';
import {
    map,
    PreiseFernwaermeEndverbrauchSource
} from '/opt/nodejs/models/preise/preise-fernwaerme-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseFernwaermeEndverbrauch();
};

const processPreiseFernwaermeEndverbrauch = async () => {
    const records = await getCSVFileFromS3<PreiseFernwaermeEndverbrauchSource>(
        SourceFiles.PREISE_FERNWAERME_ENDVERBRAUCH
    );
    const data = map(records);
    await saveAllPreiseFernwaermeEndverbrauch(data);
};
