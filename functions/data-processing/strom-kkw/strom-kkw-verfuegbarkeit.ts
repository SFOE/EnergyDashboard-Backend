import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    mapRecords,
    StromKkwVerfuegbarkeit,
    StromKkwVerfuegbarkeitSource
} from '/opt/nodejs/models/strom/strom-kkw-verfuegbarkeit.model';
import {
    deleteAllStromKkwVerfuegbarkeit,
    saveStromKkwVerfuegbarkeit
} from '/opt/nodejs/db/strom/strom-kkw-verfuegbarkeit.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processKkwVerfuegbarkeit();
};

const processKkwVerfuegbarkeit = async () => {
    const records = await getCSVFileFromS3<StromKkwVerfuegbarkeitSource>(
        SourceFiles.STROM_KKW_PRODUKTION_VERFUEGBARKEIT
    );
    const data: StromKkwVerfuegbarkeit[] = mapRecords(records);

    await deleteAllStromKkwVerfuegbarkeit();
    await saveStromKkwVerfuegbarkeit(data);
};
