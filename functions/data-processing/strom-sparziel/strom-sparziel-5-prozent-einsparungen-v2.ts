import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    deleteAllStromSparziel5ProzentEinsparungenV2,
    saveStromSparziel5ProzentEinsparungenV2
} from '/opt/nodejs/db/strom/strom-sparziel-5-prozent-einsparungen-v2.db';
import {
    StromSparziel5ProzentEinsparungenSourceV2,
    map
} from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-einsparungen-v2.model';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparziel5ProzentEinsparungenV2();
};

const stromSparziel5ProzentEinsparungenV2 = async () => {
    const records =
        await getCSVFileFromS3<StromSparziel5ProzentEinsparungenSourceV2>(
            SourceFiles.STROM_SPARZIEL_5_PROZENT_EINSPARUNGEN_V2
        );
    validateSources(records);

    const data = map(records[0]);

    await deleteAllStromSparziel5ProzentEinsparungenV2();
    await saveStromSparziel5ProzentEinsparungenV2(data);
};

const validateSources = (
    sources: StromSparziel5ProzentEinsparungenSourceV2[]
) => {
    if (!sources || sources.length > 1) {
        const errorMsg = `Sources for Strom Sparziel 5 Prozent Einsparungen V2 contain more than one entry: ${JSON.stringify(
            sources
        )}`;
        console.log(errorMsg);
        throw new Error(errorMsg);
    }
};
