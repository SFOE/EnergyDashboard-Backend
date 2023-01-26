import { saveAllGasImportKarte } from '/opt/nodejs/db/gas-import-karte.db';
import { GasImportKarteSource, map } from '/opt/nodejs/models/gas-import-karte.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasImportKarte();
};

const gasImportKarte = async () => {
    const records = await getCSVFileFromS3<GasImportKarteSource>(SourceFiles.GAS_IMPORT_KARTE);
    const data = map(records);
    console.log(`mapped data: ${JSON.stringify(data)}`);
    await saveAllGasImportKarte(data);
}


