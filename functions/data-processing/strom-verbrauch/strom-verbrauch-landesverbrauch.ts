import { saveAllStromVerbrauchLandesverbrauch } from '/opt/nodejs/db/strom-verbrauch-landesverbrauch.db';
import { map, StromVerbrauchLandesverbrauchSource } from '/opt/nodejs/models/strom-verbrauch-landesverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromVerbrauchLandesverbrauch();
};

const processStromVerbrauchLandesverbrauch = async () => {
    const records = await getCSVFileFromS3<StromVerbrauchLandesverbrauchSource>(SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH);
    const data = map(records);
    await saveAllStromVerbrauchLandesverbrauch(data);
}

