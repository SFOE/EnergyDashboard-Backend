import { saveAmpel } from '/opt/nodejs/db/ampel.db';
import { AmpelSource, map } from '/opt/nodejs/models/ampel.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getJSONFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processAmpel();
};

const processAmpel = async () => {
    const ampelSource = await getJSONFileFromS3<AmpelSource>(SourceFiles.AMPEL);
    const ampel = map(ampelSource);
    console.log(`ampel: ${JSON.stringify(ampel)}`);

    await saveAmpel(ampel);
}

