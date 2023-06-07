import {
    deleteAllDynamicTranslations,
    saveAllDynamicTranslations
} from '/opt/nodejs/db/dashboard/dynamic-translations.db';
import { DynamicTranslationSource, map } from '/opt/nodejs/models/dashboard/dynamic-translation.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { getJSONFileFromS3 } from '/opt/nodejs/storage/s3-requests';
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    await processDynamicTranslations();
};

const processDynamicTranslations = async () => {
    const translationSource = await getJSONFileFromS3<DynamicTranslationSource>(SourceFiles.DYNAMIC_TRANSLATIONS);
    const translations = map(translationSource);
    console.log(`translations: ${JSON.stringify(translations)}`);

    await deleteAllDynamicTranslations();
    await saveAllDynamicTranslations(translations);
}

