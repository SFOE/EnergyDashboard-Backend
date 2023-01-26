import {
    deleteAllGasSparzielAktuelleEinsparungV3,
    saveGasSparzielAktuelleEinsparungV3,
} from '/opt/nodejs/db/gas-sparziel-aktuelle-einsparung-v3.db';
import { map, SparzielAktuelleEinsparungSourceV2V3 } from '/opt/nodejs/models/sparziel-aktuelle-einsparung-v2-v3.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasSparzielAktuelleEinsparung();
};

const gasSparzielAktuelleEinsparung = async () => {
    const records = await getCSVFileFromS3<SparzielAktuelleEinsparungSourceV2V3>(SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG_V3);

    const data = map(records);

    await deleteAllGasSparzielAktuelleEinsparungV3();
    await saveGasSparzielAktuelleEinsparungV3(data);
}
