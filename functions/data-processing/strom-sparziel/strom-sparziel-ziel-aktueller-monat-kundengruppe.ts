import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    deleteAllStromSparzielZielAktuellerMonatKundengruppe,
    saveStromSparzielZielAktuellerMonatKundengruppe
} from '/opt/nodejs/db/strom-sparziel-ziel-aktueller-monat-kundengruppe.db';
import {
    map,
    StromSparzielZielAktuellerMonatKundengruppeSource
} from '/opt/nodejs/models/strom-sparziel-ziel-aktueller-monat-kundengruppe.model';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielZielAktuellerMonatKundengruppe();
};

const stromSparzielZielAktuellerMonatKundengruppe = async () => {
    const records = await getCSVFileFromS3<StromSparzielZielAktuellerMonatKundengruppeSource>(
        SourceFiles.STROM_SPARZIEL_ZIEL_AKTUELLER_MONAT_KUNDENGRUPPE
    );

    const data = map(records);

    await deleteAllStromSparzielZielAktuellerMonatKundengruppe();
    await saveStromSparzielZielAktuellerMonatKundengruppe(data);
};
