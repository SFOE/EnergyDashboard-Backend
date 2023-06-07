import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import {
    FuellstandGasspeicherRegionV2,
    FuellstandGasspeicherV2
} from '/opt/nodejs/models/gas/gas-fuellstand-gasspeicher-v2.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_FUELLSTAND_GASSPEICHER_V2]);

export const fetchAllFuellstandGasspeicherV2 = async (): Promise<FuellstandGasspeicherV2[]> => {
    return fetchAll(tableName);
};

export const findMostRecentFuellstandGasspeicherV2ForRegion = async (region: FuellstandGasspeicherRegionV2): Promise<FuellstandGasspeicherV2> => {
    const records = await fetchAllFuellstandGasspeicherV2();

    return records
        .filter(record => record.region === region)
        .sort(dateSortFn)
        .slice()
        .reverse()
        .find(entry => entry.speicherstandProzent !== null);
};

export const saveAllFuellstandGasspeicherV2 = async (data: FuellstandGasspeicherV2[]) => {
    await saveAll(tableName, data);
};

export const deleteAllFuellstandGasspeicherV2 = async () => {
    await deleteAll(tableName);
};


