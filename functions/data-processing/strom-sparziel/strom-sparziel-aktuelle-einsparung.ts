import {
    deleteAllStromSparzielAktuelleEinsparung,
    saveStromSparzielAktuelleEinsparung,
} from '/opt/nodejs/db/strom-sparziel-aktuelle-einsparung.db';
import { map, SparzielAktuelleEinsparungSource } from '/opt/nodejs/models/sparziel-aktuelle-einsparung.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielAktuelleEinsparung();
};

const stromSparzielAktuelleEinsparung = async () => {
    const records = await getCSVFileFromS3<SparzielAktuelleEinsparungSource>(SourceFiles.STROM_SPARZIEL_AKTUELLE_EINSPARUNG);

    const data = map(records);

    await deleteAllStromSparzielAktuelleEinsparung();
    await saveStromSparzielAktuelleEinsparung(data);
}
