import { Context, S3Event } from 'aws-lambda';
import { deleteAllStromKkwAusfaelle, saveStromKkwAusfaelle } from '/opt/nodejs/db/strom/strom-kkw-ausfaelle.db';
import {
    mapRecords,
    StromKkwAusfallSourceV1,
    StromKkwAusfallV1
} from '/opt/nodejs/models/strom/strom-kkw-ausfall.model';

import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processKkwAusfaelle();
};

const processKkwAusfaelle = async () => {
    const records = await getCSVFileFromS3<StromKkwAusfallSourceV1>(
        SourceFiles.STROM_KKW_PRODUKTION_AUSFAELLE_V1,
        'latin1'
    );
    const data: StromKkwAusfallV1[] = mapRecords(records);

    await deleteAllStromKkwAusfaelle();
    await saveStromKkwAusfaelle(data);
};
