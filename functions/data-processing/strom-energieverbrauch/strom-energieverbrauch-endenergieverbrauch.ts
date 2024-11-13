import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { groupBy } from '/opt/nodejs/utils/array.utils';
import {
    map,
    Perspektive,
    StromEnergieverbrauchEndenergieverbrauch,
    StromEnergieverbrauchEndenergieverbrauchSource
} from '/opt/nodejs/models/strom/strom-energieverbrauch-endenergieverbrauch';
import {
    deleteAllStromEnergieverbrauchEndenergieverbrauch,
    saveAllStromEnergieverbrauchEndenergieverbrauch
} from '/opt/nodejs/db/strom/strom-energieverbrauch-endenergieverbrauch';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    await processStromEnergiverbrauchEndenergieverbrauch();
};

const sourceFiles: SourceFiles[] = [
    SourceFiles.STROM_ENERGIEVERBRAUCH_ENDENERGIEVERBRAUCH_BASIS,
    SourceFiles.STROM_ENERGIEVERBRAUCH_ENDENERGIEVERBRAUCH_WWB,
    SourceFiles.STROM_ENERGIEVERBRAUCH_ENDENERGIEVERBRAUCH_ZERO_A,
    SourceFiles.STROM_ENERGIEVERBRAUCH_ENDENERGIEVERBRAUCH_ZERO_B,
    SourceFiles.STROM_ENERGIEVERBRAUCH_ENDENERGIEVERBRAUCH_ZERO_C
];

const processStromEnergiverbrauchEndenergieverbrauch =
    async (): Promise<void> => {
        const recordPromises = sourceFiles.map((sourceFile: SourceFiles) =>
            getCSVFileFromS3<StromEnergieverbrauchEndenergieverbrauchSource>(
                sourceFile
            )
        );
        const records: StromEnergieverbrauchEndenergieverbrauchSource[] = (
            await Promise.all(recordPromises)
        ).flat();
        const recordsGrouped: { [perspektive in Perspektive]: typeof records } =
            groupBy(records, 'Perspektive');
        // Each file contains the same duplicate entries for rows with perspective 'Statistik'
        // Applying the map-function removes these duplicate records as a side effect
        const data: StromEnergieverbrauchEndenergieverbrauch[] = Object.values(
            recordsGrouped
        ).flatMap((x) => map(x));

        await deleteAllStromEnergieverbrauchEndenergieverbrauch();
        await saveAllStromEnergieverbrauchEndenergieverbrauch(data);
    };
