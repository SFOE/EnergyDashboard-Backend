import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllStromSparzielAktuelleEinsparungV4,
    saveStromSparzielAktuelleEinsparungV4
} from '/opt/nodejs/db/strom-sparziel-aktuelle-einsparung-v4.db';
import {
    map,
    SparzielAktuelleEinsparungSourceV4
} from '/opt/nodejs/models/sparziel-aktuelle-einsparung-v4.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielAktuelleEinsparungV4();
};

const stromSparzielAktuelleEinsparungV4 = async () => {
    const records = await getCSVFileFromS3<SparzielAktuelleEinsparungSourceV4>(
        SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V4
    );

    const data = map(records);

    await deleteAllStromSparzielAktuelleEinsparungV4();
    await saveStromSparzielAktuelleEinsparungV4(data);
};
