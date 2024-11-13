import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    StromWinterproduktionImportExportSource,
    map,
    StromWinterproduktionImportExport
} from '/opt/nodejs/models/strom/strom-winterproduktion-import-export.model';
import {
    deleteAllWinterproduktionImportExport,
    saveAllStromWinterproduktionImportExport
} from '/opt/nodejs/db/strom/strom-winterproduktion-import-export.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromWinterproduktionImportExport();
};

const processStromWinterproduktionImportExport = async () => {
    const sources: StromWinterproduktionImportExportSource[] =
        await getCSVFileFromS3<StromWinterproduktionImportExportSource>(
            SourceFiles.STROM_WINTERPRODUKTION_IMPORT_EXPORT
        );

    const entries: StromWinterproduktionImportExport[] = map(sources);

    console.log('Deleting all Strom Winterproduktion Import Export');
    await deleteAllWinterproduktionImportExport();

    console.log('Saving all Strom Winterproduktion Import Export');
    await saveAllStromWinterproduktionImportExport(entries);
};
