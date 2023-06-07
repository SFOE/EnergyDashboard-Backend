import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { StromProduktionsMix } from '/opt/nodejs/models/strom/strom-produktionsmix.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_PRODUKTIONSMIX]);

export const fetchAllStromProduktionsMix = async (): Promise<StromProduktionsMix[]> => {
    return fetchAll(tableName);
};

export const saveAllStromProduktionsMix = async (data: StromProduktionsMix[]) => {
    await saveAll(tableName, data);
};

export const deleteAllStromProduktionsMix = async () => {
    await deleteAll(tableName);
};


