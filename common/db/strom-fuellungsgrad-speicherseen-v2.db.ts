import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromFuellungsgradSpeicherseenV2 } from '/opt/nodejs/models/strom-fuellungsgrad-speicherseen-v2.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { Region } from '../models/fuellungsgrad-speicherseen.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_FUELLUNGSGRAD_SPEICHERSEEN_V2]);

export const fetchAllStromFuellungsgradSpeicherseenV2 = async (): Promise<StromFuellungsgradSpeicherseenV2[]> => {
    return fetchAll(tableName);
}

export const findMostRecentStromFuellungsgradSpeicherseenV2ForRegion = async (region: Region): Promise<StromFuellungsgradSpeicherseenV2> => {
    const records = await fetchAllStromFuellungsgradSpeicherseenV2();

    return records
        .filter(record => record.region === region)
        .sort(dateSortFn)
        .slice()
        .reverse()
        .find(entry => entry.speicherstandProzent !== null);
}

export const saveAllStromFuellungsgradSpeicherseenV2 = async (data: StromFuellungsgradSpeicherseenV2[]) => {
    await saveAll(tableName, data);
}

export const deleteAllStromFuellungsgradSpeicherseenV2 = async () => {
    await deleteAll(tableName);
}

