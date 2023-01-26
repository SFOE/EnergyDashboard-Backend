import {
    deleteAllStromFuellungsgradSpeicherseenV2,
    saveAllStromFuellungsgradSpeicherseenV2,
} from '/opt/nodejs/db/strom-fuellungsgrad-speicherseen-v2.db';
import {
    map,
    StromFuellungsgradSpeicherseenSourceV2,
} from '/opt/nodejs/models/strom-fuellungsgrad-speicherseen-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromFuellungsgradSpeicherseenV2();
};

const processStromFuellungsgradSpeicherseenV2 = async () => {
    const records = await getCSVFileFromS3<StromFuellungsgradSpeicherseenSourceV2>(SourceFiles.STROM_FUELLUNGSGRAD_SPEICHERSEEN_V2);
    const data = map(records);

    await deleteAllStromFuellungsgradSpeicherseenV2();
    await saveAllStromFuellungsgradSpeicherseenV2(data);
}


