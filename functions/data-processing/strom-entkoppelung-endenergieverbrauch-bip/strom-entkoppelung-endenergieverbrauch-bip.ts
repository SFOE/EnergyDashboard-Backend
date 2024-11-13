import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllEntkoppelungEndenergieverbrauchBIP,
    saveAllEntkoppelungEndenergieverbrauchBIP
} from '/opt/nodejs/db/strom/strom-entkoppelung-endenergieverbrauch-bip.db';
import {
    EntkoppelungEndenergieverbrauchBIPSource,
    map
} from '/opt/nodejs/models/strom/strom-entkoppelung-endenergieverbrauch-bip.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processEntkoppelungEndenergieverbrauchBIP();
};

const processEntkoppelungEndenergieverbrauchBIP = async () => {
    const records =
        await getCSVFileFromS3<EntkoppelungEndenergieverbrauchBIPSource>(
            SourceFiles.STROM_ENTKOPPELUNG_ENDENERGIEVERBRAUCH_BIP
        );

    const data = map(records);

    await deleteAllEntkoppelungEndenergieverbrauchBIP();
    await saveAllEntkoppelungEndenergieverbrauchBIP(data);
};
