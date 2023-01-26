import { fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportKarte } from '/opt/nodejs/models/gas-import-karte.model';
import { StromProduktionImportVerbrauch } from '/opt/nodejs/models/strom-produktion-import-verbrauch.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.STROM_PRODUKTION_IMPORT_VERBRAUCH]);

export const fetchAllStromProduktionImportVerbrauch = async (): Promise<StromProduktionImportVerbrauch[]> => {
    return fetchAll(tableName);
}

export const fetchMostRecentStromProduktionImportVerbrauch = async():Promise<StromProduktionImportVerbrauch> => {
    const allEntries = await fetchAll<StromProduktionImportVerbrauch>(tableName);
    allEntries.sort(sortFn);
    return allEntries[allEntries.length - 1];
}

const sortFn = (a: StromProduktionImportVerbrauch, b: StromProduktionImportVerbrauch) => new Date(a.datum).getTime() - new Date(b.datum).getTime();

export const findStromProduktionImportVerbrauchByDate = async (date: string): Promise<StromProduktionImportVerbrauch> => {
    const params: GetCommandInput = {
        TableName: tableName,
        Key: {
            datum: date,
        },
    };

    return getItem(tableName, params);
}

export const saveAllStromProduktionImportVerbrauch = async (data: StromProduktionImportVerbrauch[]) => {
    await saveAll(tableName, data);
}

