import { saveGasSparzielAktuelleEinsparung } from '/opt/nodejs/db/gas-sparziel-aktuelle-einsparung.db';
import { saveGasSparzielZiel } from '/opt/nodejs/db/gas-sparziel-ziel.db';
import {
    GasSparzielAktuelleEinsparung,
    GasSparzielAktuelleEinsparungSource,
    map,
} from '/opt/nodejs/models/gas-sparziel-aktuelle-einsparung.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await gasSparzielAktuelleEinsparung();
};

const gasSparzielAktuelleEinsparung = async () => {
    const records = await getCSVFileFromS3<GasSparzielAktuelleEinsparungSource>(SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG);

    const data = map(records);
    await saveGasSparzielAktuelleEinsparung(data);
}
