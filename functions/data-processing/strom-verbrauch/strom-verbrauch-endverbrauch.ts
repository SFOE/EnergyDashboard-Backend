import { saveAllStromVerbrauchEndverbrauch } from '/opt/nodejs/db/strom-verbrauch-endverbrauch.db';
import { map, StromVerbrauchEndverbrauchSource } from '/opt/nodejs/models/strom-verbrauch-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromVerbrauchEndVerbrauch();
};

const processStromVerbrauchEndVerbrauch = async () => {
    const records = await getCSVFileFromS3<StromVerbrauchEndverbrauchSource>(SourceFiles.STROM_VERBRAUCH_ENDVERBRAUCH);
    const data = map(records);
    await saveAllStromVerbrauchEndverbrauch(data);
}

