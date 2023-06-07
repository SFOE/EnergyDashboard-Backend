import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { map, StromSparziel5ProzentPeakHSource } from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-peak-h.model';
import {
    deleteAllStromSparziel5ProzentPeakH,
    saveStromSparziel5ProzentPeakH
} from '/opt/nodejs/db/strom/strom-sparziel-5-prozent-peak-h.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparziel5ProzentPeakH();
};

const stromSparziel5ProzentPeakH = async () => {
    const records = await getCSVFileFromS3<StromSparziel5ProzentPeakHSource>(
        SourceFiles.STROM_SPARZIEL_5_PROZENT_PEAK_H
    );

    const data = map(records);

    await deleteAllStromSparziel5ProzentPeakH();
    await saveStromSparziel5ProzentPeakH(data);
};
