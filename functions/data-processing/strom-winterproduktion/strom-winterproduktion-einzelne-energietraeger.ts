import { Context, S3Event } from 'aws-lambda';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getCSVFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import {
    StromWinterproduktionEinzelneEnergietraegerSource,
    map,
    StromWinterproduktionEinzelneEnergietraeger
} from '/opt/nodejs/models/strom/strom-winterproduktion-einzelne-energietraeger.model';
import {
    deleteAllWinterproduktionEinzelneEnergietraeger,
    saveAllStromWinterproduktionEinzelneEnergietraeger
} from '/opt/nodejs/db/strom/strom-winterproduktion-einzelne-energietraeger.db';

export const handler = async (
    event: S3Event,
    context: Context
): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processStromWinterproduktionEinzelneEnergietraeger();
};

const processStromWinterproduktionEinzelneEnergietraeger = async () => {
    const sources: StromWinterproduktionEinzelneEnergietraegerSource[] =
        await getCSVFileFromS3<StromWinterproduktionEinzelneEnergietraegerSource>(
            SourceFiles.STROM_WINTERPRODUKTION_EINZELNE_ENERGIETRAEGER
        );

    const entries: StromWinterproduktionEinzelneEnergietraeger[] = map(sources);

    console.log('Deleting all Strom Winterproduktion einzelne Energietraeger');
    await deleteAllWinterproduktionEinzelneEnergietraeger();

    console.log('Saving all Strom Winterproduktion einzelne Energietraeger');
    await saveAllStromWinterproduktionEinzelneEnergietraeger(entries);
};
