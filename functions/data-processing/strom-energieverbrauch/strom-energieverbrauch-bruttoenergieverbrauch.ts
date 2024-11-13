import { Context, S3Event } from 'aws-lambda';
import {
    deleteAllStromEnergieverbrauchBruttoenergieverbrauch,
    saveAllStromEnergieverbrauchBruttoenergieverbrauch
} from '/opt/nodejs/db/strom/strom-energieverbrauch-bruttoenergieverbrauch';
import {
    Perspektive,
    StromEnergieverbrauchBruttoenergieverbrauchSource,
    map
} from '/opt/nodejs/models/strom/strom-energieverbrauch-bruttoenergieverbrauch';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { groupBy } from '/opt/nodejs/utils/array.utils';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    await processStromEnergiverbrauchBruttoenergieverbrauch();
};

const sourceFiles = [
    SourceFiles.STROM_ENERGIEVERBRAUCH_BRUTTOENERGIEVERBRAUCH_BASIS,
    SourceFiles.STROM_ENERGIEVERBRAUCH_BRUTTOENERGIEVERBRAUCH_WWB,
    SourceFiles.STROM_ENERGIEVERBRAUCH_BRUTTOENERGIEVERBRAUCH_ZERO_A,
    SourceFiles.STROM_ENERGIEVERBRAUCH_BRUTTOENERGIEVERBRAUCH_ZERO_B,
    SourceFiles.STROM_ENERGIEVERBRAUCH_BRUTTOENERGIEVERBRAUCH_ZERO_C
];

const processStromEnergiverbrauchBruttoenergieverbrauch = async () => {
    const recordPromises = sourceFiles.map((sourceFile) =>
        getCSVFileFromS3<StromEnergieverbrauchBruttoenergieverbrauchSource>(
            sourceFile
        )
    );
    const records = (await Promise.all(recordPromises)).flat();
    const recordsGrouped: { [perspektive in Perspektive]: typeof records } =
        groupBy(records, 'Perspektive');
    // Each file contains the same duplicate entries for rows with perspective 'Statistik'
    // Applying the map-function removes these duplicate records as a side effect
    const data = Object.values(recordsGrouped).flatMap((x) => map(x));

    await deleteAllStromEnergieverbrauchBruttoenergieverbrauch();
    await saveAllStromEnergieverbrauchBruttoenergieverbrauch(data);
};
