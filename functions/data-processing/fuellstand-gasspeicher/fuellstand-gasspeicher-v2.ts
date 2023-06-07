import {
    deleteAllFuellstandGasspeicherV2,
    saveAllFuellstandGasspeicherV2
} from '/opt/nodejs/db/gas/gas-fuellstand-gasspeicher-v2.db';
import { FuellstandGasspeicherSourceV2, map } from '/opt/nodejs/models/gas/gas-fuellstand-gasspeicher-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processFuellstandGasspeicherV2();
};

const processFuellstandGasspeicherV2 = async () => {
    const records = await getCSVFileFromS3<FuellstandGasspeicherSourceV2>(SourceFiles.GAS_FUELLSTAND_GASSPEICHER_V2);
    const data = map(records);

    await deleteAllFuellstandGasspeicherV2();
    await saveAllFuellstandGasspeicherV2(data);
}


