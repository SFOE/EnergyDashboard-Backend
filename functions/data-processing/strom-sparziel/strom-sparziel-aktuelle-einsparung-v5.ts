import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllStromSparzielAktuelleEinsparungV5,
    saveStromSparzielAktuelleEinsparungV5
} from '/opt/nodejs/db/strom/strom-sparziel-aktuelle-einsparung-v5.db';
import {
    map,
    SparzielAktuelleEinsparungSourceV5
} from '/opt/nodejs/models/sparziel/sparziel-aktuelle-einsparung-v5.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielAktuelleEinsparungV5();
};

const stromSparzielAktuelleEinsparungV5 = async () => {
    const records = await getCSVFileFromS3<SparzielAktuelleEinsparungSourceV5>(
        SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG_V5
    );

    const data = map(records);

    await deleteAllStromSparzielAktuelleEinsparungV5();
    await saveStromSparzielAktuelleEinsparungV5(data);
};
