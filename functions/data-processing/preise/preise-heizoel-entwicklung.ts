import { Context, S3Event } from 'aws-lambda';
import { saveAllPreiseHeizoelEntwicklung } from '/opt/nodejs/db/preise/preise-heizoel-entwicklung.db';
import {
    map,
    PreiseHeizoelEntwicklungSource
} from '/opt/nodejs/models/preise/preise-heizoel-entwicklung.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processPreiseHeizoelEntwicklung();
};

const processPreiseHeizoelEntwicklung = async () => {
    const records = await getCSVFileFromS3<PreiseHeizoelEntwicklungSource>(
        SourceFiles.PREISE_HEIZOEL_ENTWICKLUNG
    );
    const data = map(records);
    await saveAllPreiseHeizoelEntwicklung(data);
};
