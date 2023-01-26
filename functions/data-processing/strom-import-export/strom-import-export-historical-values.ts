import { saveAllStromImportExportHistoricalValues } from '/opt/nodejs/db/strom-import-export-historical-values.db';
import {
    map,
    StromImportExportHistoricalValueSource,
} from '/opt/nodejs/models/strom-import-export-historical-values.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromImportExportHistoricalValues();
};

const processStromImportExportHistoricalValues = async () => {
    const records = await getCSVFileFromS3<StromImportExportHistoricalValueSource>(SourceFiles.STROM_IMPORT_EXPORT_HISTORICAL_VALUES);
    const data = map(records);
    await saveAllStromImportExportHistoricalValues(data);
}


