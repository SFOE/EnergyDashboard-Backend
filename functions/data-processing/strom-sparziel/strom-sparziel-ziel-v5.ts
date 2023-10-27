import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

import {
    SparzielZielSourceV5,
    map
} from '/opt/nodejs/models/sparziel/sparziel-ziel-v5.model';
import {
    deleteAllStromSparzielZielV5,
    saveStromSparzielZielV5
} from '/opt/nodejs/db/strom/strom-sparziel-ziel-v5.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielZielV5();
};

const stromSparzielZielV5 = async () => {
    const records = await getCSVFileFromS3<SparzielZielSourceV5>(
        SourceFiles.STROM_SPARZIEL_ZIEL_V5
    );

    validateRecords(records);

    const data = map(records[0]);

    await deleteAllStromSparzielZielV5();
    await saveStromSparzielZielV5(data);
};

const validateRecords = (records: SparzielZielSourceV5[]) => {
    if (records.length !== 1) {
        const errorMsg = `Expecting exactly one element for ${SourceFiles.STROM_SPARZIEL_ZIEL_V5}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};
