import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllStromKkwProduktionFr,
    saveAllStromKkwProduktionFr
} from '/opt/nodejs/db/strom/strom-kkw-produktion.db';
import {
    mapRecord,
    StromKkwProduktionSourceV1,
    StromKkwProduktionV1
} from '/opt/nodejs/models/strom/strom-kkw-produktion.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromKkwProduktionSourceFrV1
    extends StromKkwProduktionSourceV1 {
    FR_GWh: string;
}

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processKkwProduktionCh();
};

const processKkwProduktionCh = async () => {
    const records = await getCSVFileFromS3<StromKkwProduktionSourceFrV1>(
        SourceFiles.STROM_KKW_PRODUKTION_FR_V1
    );
    const data: StromKkwProduktionV1[] = mapRecords(records);

    await deleteAllStromKkwProduktionFr();
    await saveAllStromKkwProduktionFr(data);
};

const mapRecords = (
    records: StromKkwProduktionSourceFrV1[]
): StromKkwProduktionV1[] =>
    records.map((record) => ({
        ...mapRecord(record),
        currentProduction: parseFloatOrNullForNA(record.FR_GWh)
    }));
