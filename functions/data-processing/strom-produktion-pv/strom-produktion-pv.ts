import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    map,
    StromProduktionPvSource
} from '/opt/nodejs/models/strom/strom-produktion-pv.model';
import {
    deleteAllStromProduktionPv,
    saveAllStromProduktionPv
} from '/opt/nodejs/db/strom/strom-produktion-pv.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromProduktionPv();
};

const processStromProduktionPv = async () => {
    const sources = await getCSVFileFromS3<StromProduktionPvSource>(
        SourceFiles.STROM_PRODUKTION_PV
    );

    const entries = map(sources);

    console.log('Deleting all Strom Produktion PV');
    await deleteAllStromProduktionPv();

    console.log('Saving all Strom Produktion PV');
    await saveAllStromProduktionPv(entries);
};
