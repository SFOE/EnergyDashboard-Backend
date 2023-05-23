import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    deleteAllStromSparzielEinsparungProMonatKundengruppe,
    saveStromSparzielEinsparungProMonatKundengruppe
} from '/opt/nodejs/db/strom-sparziel-einsparung-pro-monat-kundengruppe.db';
import {
    map,
    StromSparzielEinsparungProMonatKundengruppeSource
} from '/opt/nodejs/models/strom-sparziel-einsparung-pro-monat-kundengruppe.model';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielEinsparungProMonatKundengruppe();
};

const stromSparzielEinsparungProMonatKundengruppe = async () => {
    const records = await getCSVFileFromS3<StromSparzielEinsparungProMonatKundengruppeSource>(
        SourceFiles.STROM_SPARZIEL_EINSPARUNG_PRO_MONAT_KUNDENGRUPPE
    );

    const data = map(records);

    await deleteAllStromSparzielEinsparungProMonatKundengruppe();
    await saveStromSparzielEinsparungProMonatKundengruppe(data);
};
