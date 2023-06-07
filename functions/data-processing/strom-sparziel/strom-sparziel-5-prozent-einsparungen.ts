import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    map,
    StromSparziel5ProzentEinsparungenSource
} from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-einsparungen.model';
import {
    deleteAllStromSparziel5ProzentEinsparungen,
    saveStromSparziel5ProzentEinsparungen
} from '/opt/nodejs/db/strom/strom-sparziel-5-prozent-einsparungen.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await stromSparziel5ProzentEinsparungen();
};

const stromSparziel5ProzentEinsparungen = async () => {
    const records = await getCSVFileFromS3<StromSparziel5ProzentEinsparungenSource>(
        SourceFiles.STROM_SPARZIEL_5_PROZENT_EINSPARUNGEN
    );
    validateSources(records);

    const data = map(records[0]);

    await deleteAllStromSparziel5ProzentEinsparungen();
    await saveStromSparziel5ProzentEinsparungen(data);
};


const validateSources = (sources: StromSparziel5ProzentEinsparungenSource[]) => {
    if (!sources || sources.length > 1) {
        const errorMsg = `Sources for Strom Sparziel 5 Prozent Einsparungen contain more than one entry: ${JSON.stringify(
            sources
        )}`;
        console.log(errorMsg);
        throw new Error(errorMsg);
    }
};