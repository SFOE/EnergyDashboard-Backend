import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromKkwProduktionV1 } from '/opt/nodejs/models/strom/strom-kkw-produktion.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { findLastIndex } from '/opt/nodejs/utils/array.utils';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

// Produktion CH

const produktionChTableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_KKW_PRODUKTION_CH_V1]
);

export const fetchAllStromKkwProduktionCh = async (): Promise<
    StromKkwProduktionV1[]
> => {
    return fetchAll(produktionChTableName);
};

export const fetchMostRecentStromKkwProduktionCh = async (): Promise<StromKkwProduktionV1> => {
    const data = await fetchAll<StromKkwProduktionV1>(produktionChTableName);
    return findMostRecentEntryWithValue(data);
};

export const deleteAllStromKkwProduktionCh = async () => {
    await deleteAll(produktionChTableName);
};

export const saveAllStromKkwProduktionCh = async (
    data: StromKkwProduktionV1[]
) => {
    await saveAll(produktionChTableName, data);
};

// Produktion FR

const produktionFrTableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_KKW_PRODUKTION_FR_V1]
);

export const fetchAllStromKkwProduktionFr = async (): Promise<
    StromKkwProduktionV1[]
> => {
    return fetchAll(produktionFrTableName);
};

export const fetchMostRecentStromKkwProduktionFr = async (): Promise<StromKkwProduktionV1> => {
    const data = await fetchAll<StromKkwProduktionV1>(produktionFrTableName);
    return findMostRecentEntryWithValue(data);
};

export const deleteAllStromKkwProduktionFr = async () => {
    await deleteAll(produktionFrTableName);
};

export const saveAllStromKkwProduktionFr = async (
    data: StromKkwProduktionV1[]
) => {
    await saveAll(produktionFrTableName, data);
};

// General

const findMostRecentEntryWithValue = (data: StromKkwProduktionV1[]): StromKkwProduktionV1 => {
    data.sort(dateSortFn);
    const index = findLastIndex(
        data,
        (entry) => !!entry.currentProduction
    );
    return data[index];
};