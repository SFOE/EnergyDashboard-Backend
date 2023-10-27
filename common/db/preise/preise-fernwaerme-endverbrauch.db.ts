import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseFernwaermeEndverbrauch } from '/opt/nodejs/models/preise/preise-fernwaerme-endverbrauch.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_FERNWAERME_ENDVERBRAUCH]
);

export const fetchAllPreiseFernwaermeEndverbrauch = async (): Promise<
    PreiseFernwaermeEndverbrauch[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseFernwaermeEndverbrauch =
    async (): Promise<PreiseFernwaermeEndverbrauch> => {
        const items = await fetchAllPreiseFernwaermeEndverbrauch();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseFernwaermeEndverbrauch = async (
    data: PreiseFernwaermeEndverbrauch[]
) => {
    await saveAll(tableName, data);
};
