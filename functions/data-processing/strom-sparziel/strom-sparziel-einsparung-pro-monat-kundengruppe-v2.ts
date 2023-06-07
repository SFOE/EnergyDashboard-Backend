import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    map,
    StromSparzielEinsparungProMonatKundengruppeSourceV2
} from '/opt/nodejs/models/strom/strom-sparziel-einsparung-pro-monat-kundengruppe-v2.model';
import {
    deleteAllStromSparzielEinsparungProMonatKundengruppeV2,
    saveStromSparzielEinsparungProMonatKundengruppeV2
} from '/opt/nodejs/db/strom/strom-sparziel-einsparung-pro-monat-kundengruppe-v2.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparzielEinsparungProMonatKundengruppeV2();
};

const stromSparzielEinsparungProMonatKundengruppeV2 = async () => {
    const records = await getCSVFileFromS3<StromSparzielEinsparungProMonatKundengruppeSourceV2>(
        SourceFiles.STROM_SPARZIEL_EINSPARUNG_PRO_MONAT_KUNDENGRUPPE_V2
    );

    const data = map(records);

    await deleteAllStromSparzielEinsparungProMonatKundengruppeV2();
    await saveStromSparzielEinsparungProMonatKundengruppeV2(data);
};
