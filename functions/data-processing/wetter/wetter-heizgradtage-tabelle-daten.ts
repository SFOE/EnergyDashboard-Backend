import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    map,
    WetterHeizgradtageTabelleDatenSource
} from '/opt/nodejs/models/wetter/wetter-heizgradtage-tabelle-daten.model';
import {
    deleteAllWetterHeizgradtageTabelleDaten,
    saveAllWetterHeizgradtageTabelleDaten
} from '/opt/nodejs/db/wetter/wetter-heizgradtage-tabelle-daten.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterHeizgradtageTabelleDaten();
};

const processWetterHeizgradtageTabelleDaten = async () => {
    const sources =
        await getCSVFileFromS3<WetterHeizgradtageTabelleDatenSource>(
            SourceFiles.WETTER_HEIZGRADTAGE_TABELLE_DATEN
        );

    const entries = map(sources);

    console.log('Deleting all Wetter Heizgradtage Tabelle Daten');
    await deleteAllWetterHeizgradtageTabelleDaten();

    console.log('Saving all Wetter Heizgradtage Tabelle Daten');
    await saveAllWetterHeizgradtageTabelleDaten(entries);
};
