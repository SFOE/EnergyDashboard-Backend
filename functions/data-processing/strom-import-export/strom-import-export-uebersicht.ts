import {
    deleteAllStromImportExportUebersicht,
    saveAllStromImportExportUebersicht
} from '/opt/nodejs/db/strom/strom-import-export-uebersicht.db';
import { map, StromImportExportUebersichtSource } from '/opt/nodejs/models/strom/strom-import-export-uebersicht.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromImportExportUebersicht();
};

const processStromImportExportUebersicht = async () => {
    const records = await getCSVFileFromS3<StromImportExportUebersichtSource>(SourceFiles.STROM_IMPORT_EXPORT_UEBERSICHT);
    const data = map(records);
    console.log('Deleting All Strom Import Export Uebersicht');
    await deleteAllStromImportExportUebersicht();
    console.log('Saving All Strom Import Export Uebersicht');
    await saveAllStromImportExportUebersicht(data);
}


