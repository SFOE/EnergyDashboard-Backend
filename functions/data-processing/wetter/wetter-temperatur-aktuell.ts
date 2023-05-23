import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllWetterTemperaturAktuell,
    saveAllWetterTemperaturAktuell
} from '/opt/nodejs/db/wetter/wetter-temperatur-aktuell.db';
import {
    map,
    WetterTemperaturAktuellSource
} from '/opt/nodejs/models/wetter/wetter-temperatur-aktuell.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { isNumber } from '/opt/nodejs/utils/number.utils';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processWetterTemperaturAktuell();
};

const processWetterTemperaturAktuell = async () => {
    const sources = await getCSVFileFromS3<WetterTemperaturAktuellSource>(
        SourceFiles.WETTER_TEMPERATUR_AKTUELL
    );

    validateSources(sources);

    const entries = map(sources);

    console.log('Deleting all Wetter Temperatur Aktuell');
    await deleteAllWetterTemperaturAktuell();

    console.log('Saving all Wetter Temperatur Aktuell');
    await saveAllWetterTemperaturAktuell(entries);
};

const validateSources = (sources: WetterTemperaturAktuellSource[]) => {
    const isUndefined = !sources;
    const isAnyValueUndefined = sources.some(
        (source) =>
            !isNumber(source.Luftemperatur_Tagesmittel_Norm) ||
            !isNumber(source['5y_Max']) ||
            !isNumber(source['5y_Min'])
    );
    if (isUndefined || isAnyValueUndefined) {
        const errorMsg =
            'Sources for Wetter Temperatur Aktuell contains one or more invalid entry';
        console.error(errorMsg, JSON.stringify(sources));
        throw new Error(errorMsg);
    }
};
