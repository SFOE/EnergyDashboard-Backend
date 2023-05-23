import {
    deleteAllGasSparzielZielV2,
    saveGasSparzielZielV2
} from '/opt/nodejs/db/gas-sparziel-ziel-v2.db';
import {
    map,
    SparzielZielSource
} from '/opt/nodejs/models/sparziel-ziel.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasSparzielZiel();
};

const gasSparzielZiel = async () => {
    const records = await getCSVFileFromS3<SparzielZielSource>(
        SourceFiles.GAS_SPARZIEL_ZIEL_V2
    );

    validateRecords(records);
    const [meassuredRecord, estimatedRecord] = records;

    const data = map(meassuredRecord, estimatedRecord);

    await deleteAllGasSparzielZielV2();
    await saveGasSparzielZielV2(data);
};

const validateRecords = (records: SparzielZielSource[]) => {
    if (records.length <= 0 || records.length > 2) {
        const errorMsg = `Expecting one or two elements for ${SourceFiles.GAS_SPARZIEL_ZIEL}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};
