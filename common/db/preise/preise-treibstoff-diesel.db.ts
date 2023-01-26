import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseTreibstoffDiesel } from '/opt/nodejs/models/preise/preise-treibstoff-diesel.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_TREIBSTOFF_DIESEL]
);

export const fetchAllPreiseTreibstoffDiesel = async (): Promise<
    PreiseTreibstoffDiesel[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseTreibstoffDiesel =
    async (): Promise<PreiseTreibstoffDiesel> => {
        const items = await fetchAllPreiseTreibstoffDiesel();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseTreibstoffDiesel = async (
    data: PreiseTreibstoffDiesel[]
) => {
    await saveAll(tableName, data);
};
