import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';
import { GasImportEuropaJaehrlichSource, map } from '/opt/nodejs/models/gas/gas-import-europa-jaehrlich.model';
import {
    deleteAllGasImportEuropaJaehrlich,
    saveAllGasImportEuropaJaehrlich
} from '/opt/nodejs/db/gas/gas-import-europa-jaehrlich.db';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasImportEuropaJaehrlich();
};

const gasImportEuropaJaehrlich = async () => {
    const records = await getCSVFileFromS3<GasImportEuropaJaehrlichSource>(SourceFiles.GAS_IMPORT_EUROPA_JAEHRLICH);
    const data = map(records);

    console.log('Deleting All Gas Import Europa Jaehrlich');
    await deleteAllGasImportEuropaJaehrlich();

    console.log('Saving All Gas Import Europa Jaehrlich');
    await saveAllGasImportEuropaJaehrlich(data);
};


