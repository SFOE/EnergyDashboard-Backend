import {
    deleteAllStromVerbrauchEndverbrauchV2,
    saveAllStromVerbrauchEndverbrauchV2
} from '/opt/nodejs/db/strom/strom-verbrauch-endverbrauch-v2.db';
import {
    map,
    StromVerbrauchEndverbrauchSourceV2
} from '/opt/nodejs/models/strom/strom-verbrauch-endverbrauch-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromVerbrauchEndverbrauch();
};

const processStromVerbrauchEndverbrauch = async () => {
    const records = await getCSVFileFromS3<StromVerbrauchEndverbrauchSourceV2>(
        SourceFiles.STROM_VERBRAUCH_ENDVERBRAUCH_V2
    );
    const data = map(records);

    await deleteAllStromVerbrauchEndverbrauchV2();
    await saveAllStromVerbrauchEndverbrauchV2(data);
};
