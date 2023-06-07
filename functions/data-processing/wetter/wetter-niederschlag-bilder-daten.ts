import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    map,
    WetterNiederschlagBilderDatenSource
} from '/opt/nodejs/models/wetter/wetter-niederschlag-bilder-daten.model';
import {
    deleteAllWetterNiederschlagBilderDaten,
    saveWetterNiederschlagBilderDaten
} from '/opt/nodejs/db/wetter/wetter-niederschlag-bilder-daten.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterNiederschlagBilderDaten();
};

const processWetterNiederschlagBilderDaten = async () => {
    const sources = await getCSVFileFromS3<WetterNiederschlagBilderDatenSource>(
        SourceFiles.WETTER_NIEDERSCHLAG_BILDER_DATEN
    );

    validateRecords(sources);

    const entry = map(sources[0]);

    console.log('Deleting all Wetter Niederschlag Bilder Daten');
    await deleteAllWetterNiederschlagBilderDaten();

    console.log('Saving all Wetter Niederschlag Bilder Daten');
    await saveWetterNiederschlagBilderDaten(entry);
};

const validateRecords = (records: WetterNiederschlagBilderDatenSource[]) => {
    if (records.length !== 1) {
        const errorMsg = `Expecting exactly one element for ${SourceFiles.WETTER_NIEDERSCHLAG_BILDER_DATEN}, got ${records.length} elements`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};
