import {
    deleteAllGasImportHistoricalValuesV2,
    saveAllGasImportHistoricalValuesV2,
} from '/opt/nodejs/db/gas-import-historical-values-v2.db';
import { GasImportHistoricalValueSourceV2, map } from '/opt/nodejs/models/gas-import-historical-values-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processGasImportHistoricalValues();
};

const processGasImportHistoricalValues = async () => {
    const records = await getCSVFileFromS3<GasImportHistoricalValueSourceV2>(SourceFiles.GAS_IMPORT_HISTORICAL_VALUES_V2);
    const data = map(records);

    await deleteAllGasImportHistoricalValuesV2();
    await saveAllGasImportHistoricalValuesV2(data);
}


