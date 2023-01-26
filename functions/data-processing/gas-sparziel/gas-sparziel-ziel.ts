import { saveGasSparzielZiel } from '/opt/nodejs/db/gas-sparziel-ziel.db';
import { GasSparzielZielSource, map } from '/opt/nodejs/models/gas-sparziel-ziel.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasSparzielZiel();
};

const gasSparzielZiel = async () => {
    const records = await getCSVFileFromS3<GasSparzielZielSource>(SourceFiles.GAS_SPARZIEL_ZIEL);

    validateRecords(records);

    const data = map(records[0]);
    await saveGasSparzielZiel(data);
}

const validateRecords = (records: GasSparzielZielSource[]) => {
    if (records.length === 0 || records.length > 1) {
        const errorMsg = `Expecting exactly 1 element for ${SourceFiles.GAS_SPARZIEL_ZIEL}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
}


