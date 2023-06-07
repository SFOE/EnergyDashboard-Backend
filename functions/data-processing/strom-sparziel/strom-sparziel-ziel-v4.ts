import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map, SparzielZielSourceV4 } from '/opt/nodejs/models/sparziel/sparziel-ziel-v4.model';
import { deleteAllStromSparzielZielV4, saveStromSparzielZielV4 } from '/opt/nodejs/db/strom/strom-sparziel-ziel-v4.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielZielV4();
};

const stromSparzielZielV4 = async () => {
    const records = await getCSVFileFromS3<SparzielZielSourceV4>(
        SourceFiles.STROM_SPARZIEL_ZIEL_V4
    );

    validateRecords(records);

    const data = map(records[0]);

    await deleteAllStromSparzielZielV4();
    await saveStromSparzielZielV4(data);
};

const validateRecords = (records: SparzielZielSourceV4[]) => {
    if (records.length !== 1) {
        const errorMsg = `Expecting exactly one element for ${SourceFiles.STROM_SPARZIEL_ZIEL_V4}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};
