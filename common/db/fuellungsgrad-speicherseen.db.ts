import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { FuellungsgradSpeicherseen, Region } from '../models/fuellungsgrad-speicherseen.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.FUELLUNGSGRAD_SPEICHERSEEN]);

export const fetchAllFuellungsgradSpeicherseen = async (): Promise<FuellungsgradSpeicherseen[]> => {
    return fetchAll(tableName);
}

export const findMostRecentFuellungsgradSpeicherseenForRegion = async (region: Region): Promise<FuellungsgradSpeicherseen> => {
    const records = await fetchAllFuellungsgradSpeicherseen();

    return records
        .filter(record => record.region === region)
        .sort(sortFn)
        .slice()
        .reverse()
        .find(entry => entry.speicherstandProzent !== null);
}

const sortFn = (a: FuellungsgradSpeicherseen, b: FuellungsgradSpeicherseen) => a.kalenderwoche - b.kalenderwoche;

export const saveAllFuellungsgradSpeicherseen = async (data: FuellungsgradSpeicherseen[]) => {
    await saveAll(tableName, data);
}

