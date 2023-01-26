import { saveAllStromImportExportNetto } from '/opt/nodejs/db/strom-import-export-netto.db';
import { map, StromImportExportNettoSource } from '/opt/nodejs/models/strom-import-export-netto.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromImportExportNetto();
};

const processStromImportExportNetto = async () => {
    const records = await getCSVFileFromS3<StromImportExportNettoSource>(SourceFiles.STROM_IMPORT_EXPORT_NETTO);
    const data = map(records);
    console.log(`mapped data: ${JSON.stringify(data)}`);
    await saveAllStromImportExportNetto(data);
}


