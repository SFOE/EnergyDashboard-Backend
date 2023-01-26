import { saveAllStromProduktionImportVerbrauch } from '/opt/nodejs/db/strom-produktion-import-verbrauch.db';
import { saveAllStromProduktionsMix } from '/opt/nodejs/db/strom-produktionsmix.db';
import { map, StromProduktionImportVerbrauchSource } from '/opt/nodejs/models/strom-produktion-import-verbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromProduktionImportVerbrauch();
};

const processStromProduktionImportVerbrauch = async () => {
    const records = await getCSVFileFromS3<StromProduktionImportVerbrauchSource>(SourceFiles.STROM_PRODUKTION_IMPORT_VERBRAUCH);
    const data = map(records);
    await saveAllStromProduktionImportVerbrauch(data);
}


