import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllGasSparzielZielV5,
    saveGasSparzielZielV5
} from '/opt/nodejs/db/gas/gas-sparziel-ziel-v5.db';
import {
    GasSparzielSourceV5,
    map
} from '/opt/nodejs/models/gas/gas-sparziel-v5.model';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasSparzielZielV5();
};

const gasSparzielZielV5 = async () => {
    const records = await getCSVFileFromS3<GasSparzielSourceV5>(
        SourceFiles.GAS_SPARZIEL_ZIEL_V5
    );

    validateRecords(records);

    const data = map(records[0]);

    await deleteAllGasSparzielZielV5();
    await saveGasSparzielZielV5(data);
};

const validateRecords = (records: GasSparzielSourceV5[]) => {
    if (records.length !== 1) {
        const errorMsg = `Expecting exactly one element for ${SourceFiles.GAS_SPARZIEL_ZIEL_V5}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};
