import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map } from '/opt/nodejs/models/gas/gas-import-europa-trend.model';
import { GasImportEuropaTrendSource } from '/opt/nodejs/models/gas/gas-import-europa-trend.model';
import {
    deleteGasImportEuropaTrend,
    saveGasImportEuropaTrend
} from '/opt/nodejs/db/gas/gas-import-europa-trend.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processGasImportEuropaTrend();
};

const processGasImportEuropaTrend = async () => {
    const records = await getCSVFileFromS3<GasImportEuropaTrendSource>(
        SourceFiles.GAS_IMPORT_EUROPA_TREND
    );

    const data = map(records);

    await deleteGasImportEuropaTrend();
    await saveGasImportEuropaTrend(data);
};
