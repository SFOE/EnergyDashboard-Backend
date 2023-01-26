import {
    deleteAllStromVerbrauchLandesverbrauchVergleichV2,
    saveAllStromVerbrauchLandesverbrauchVergleichV2,
} from '/opt/nodejs/db/strom-verbrauch-landesverbrauch-vergleich-v2.db';
import {
    map,
    StromVerbrauchLandesverbrauchVergleichSourceV2,
} from '/opt/nodejs/models/strom-verbrauch-landesverbrauch-vergleich-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromVerbrauchLandesverbrauchVergleich();
};

const processStromVerbrauchLandesverbrauchVergleich = async () => {
    const records = await getCSVFileFromS3<StromVerbrauchLandesverbrauchVergleichSourceV2>(SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_VERGLEICH_V2);
    const data = map(records);

    await deleteAllStromVerbrauchLandesverbrauchVergleichV2();
    await saveAllStromVerbrauchLandesverbrauchVergleichV2(data);
}

