import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    deleteAllStromSparzielEinsparungAktuellerMonatKundengruppe,
    saveStromSparzielEinsparungAktuellerMonatKundengruppe
} from '/opt/nodejs/db/strom/strom-sparziel-einsparung-aktueller-monat-kundengruppe.db';
import {
    map,
    StromSparzielEinsparungAktuellerMonatKundengruppeSource
} from '/opt/nodejs/models/strom/strom-sparziel-einsparung-aktueller-monat-kundengruppe.model';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielEinsparungAktuellerMonatKundengruppe();
};

const stromSparzielEinsparungAktuellerMonatKundengruppe = async () => {
    const records = await getCSVFileFromS3<StromSparzielEinsparungAktuellerMonatKundengruppeSource>(
        SourceFiles.STROM_SPARZIEL_EINSPARUNG_AKTUELLER_MONAT_KUNDENGRUPPE
    );

    const data = map(records);

    await deleteAllStromSparzielEinsparungAktuellerMonatKundengruppe();
    await saveStromSparzielEinsparungAktuellerMonatKundengruppe(data);
};
