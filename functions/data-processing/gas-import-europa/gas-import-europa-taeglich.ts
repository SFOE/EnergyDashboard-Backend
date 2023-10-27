import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';
import { GasImportEuropaTaeglichSource, map } from '/opt/nodejs/models/gas/gas-import-europa-taeglich.model';
import {
    deleteAllGasImportEuropaTaeglich,
    saveAllGasImportEuropaTaeglich
} from '/opt/nodejs/db/gas/gas-import-europa-taeglich.db';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasImportEuropaTaeglich();
};

const gasImportEuropaTaeglich = async () => {
    const records = await getCSVFileFromS3<GasImportEuropaTaeglichSource>(SourceFiles.GAS_IMPORT_EUROPA_TAEGLICH);
    const data = map(records);

    console.log('Deleting All Gas Import Europa Taeglich');
    await deleteAllGasImportEuropaTaeglich();

    console.log('Saving All Gas Import Europa Taeglich');
    await saveAllGasImportEuropaTaeglich(data);
};


