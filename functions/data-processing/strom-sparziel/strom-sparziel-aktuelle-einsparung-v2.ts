import {
    deleteAllStromSparzielAktuelleEinsparungV2,
    saveStromSparzielAktuelleEinsparungV2,
} from '/opt/nodejs/db/strom-sparziel-aktuelle-einsparung-v2.db';
import { map, SparzielAktuelleEinsparungSourceV2V3 } from '/opt/nodejs/models/sparziel-aktuelle-einsparung-v2-v3.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielAktuelleEinsparungV2();
};

const stromSparzielAktuelleEinsparungV2 = async () => {
    const records = await getCSVFileFromS3<SparzielAktuelleEinsparungSourceV2V3>(SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V2);

    const data = map(records);

    await deleteAllStromSparzielAktuelleEinsparungV2();
    await saveStromSparzielAktuelleEinsparungV2(data);
}
