import {
    deleteAllStromImportExportHistoricalValuesV2,
    saveAllStromImportExportHistoricalValuesV2
} from '/opt/nodejs/db/strom/strom-import-export-historical-values-v2.db';
import {
    map,
    StromImportExportHistoricalValueSourceV2
} from '/opt/nodejs/models/strom/strom-import-export-historical-values-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromImportExportHistoricalValues();
};

const processStromImportExportHistoricalValues = async () => {
    const records = await getCSVFileFromS3<StromImportExportHistoricalValueSourceV2>(SourceFiles.STROM_IMPORT_EXPORT_HISTORICAL_VALUES_V2);
    const data = map(records);

    await deleteAllStromImportExportHistoricalValuesV2();
    await saveAllStromImportExportHistoricalValuesV2(data);
}


