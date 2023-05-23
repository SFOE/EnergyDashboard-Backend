import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllStromSparzielZiel,
    saveStromSparzielZiel
} from '/opt/nodejs/db/strom-sparziel-ziel.db';
import {
    map,
    SparzielZielSource
} from '/opt/nodejs/models/sparziel-ziel.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielZiel();
};

const stromSparzielZiel = async () => {
    const records = await getCSVFileFromS3<SparzielZielSource>(
        SourceFiles.STROM_SPARZIEL_ZIEL
    );

    validateRecords(records);
    const [meassuredRecord, estimatedRecord] = records;

    const data = map(meassuredRecord, estimatedRecord);

    await deleteAllStromSparzielZiel();
    await saveStromSparzielZiel(data);
};

const validateRecords = (records: SparzielZielSource[]) => {
    if (records.length <= 0 || records.length > 2) {
        const errorMsg = `Expecting exactly 2 elemente for ${SourceFiles.STROM_SPARZIEL_ZIEL}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};
