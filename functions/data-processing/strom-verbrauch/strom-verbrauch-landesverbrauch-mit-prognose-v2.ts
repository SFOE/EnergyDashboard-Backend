import {
    deleteAllStromVerbrauchLandesverbrauchMitPrognoseV2,
    saveAllStromVerbrauchLandesverbrauchMitPrognoseV2
} from '/opt/nodejs/db/strom/strom-verbrauch-landesverbrauch-mit-prognose-v2.db';
import {
    map,
    StromVerbrauchLandesverbrauchMitPrognoseSourceV2
} from '/opt/nodejs/models/strom/strom-verbrauch-landesverbrauch-mit-prognose-v2.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromVerbrauchLandesverbrauchMitPrognose();
};

const processStromVerbrauchLandesverbrauchMitPrognose = async () => {
    const records = await getCSVFileFromS3<StromVerbrauchLandesverbrauchMitPrognoseSourceV2>(SourceFiles.STROM_VERBRAUCH_LANDESVERBRAUCH_MIT_PROGNOSE_V2);
    const data = map(records);

    await deleteAllStromVerbrauchLandesverbrauchMitPrognoseV2();
    await saveAllStromVerbrauchLandesverbrauchMitPrognoseV2(data);
}

