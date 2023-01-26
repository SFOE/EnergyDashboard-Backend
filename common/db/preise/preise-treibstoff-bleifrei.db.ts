import { fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { PreiseTreibstoffBleifrei } from '/opt/nodejs/models/preise/preise-treibstoff-bleifrei.model';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { getMostRecentEntry } from '/opt/nodejs/utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.PREISE_TREIBSTOFF_BLEIFREI]
);

export const fetchAllPreiseTreibstoffBleifrei = async (): Promise<
    PreiseTreibstoffBleifrei[]
> => {
    return fetchAll(tableName);
};

export const fetchCurrentPreiseTreibstoffBleifrei =
    async (): Promise<PreiseTreibstoffBleifrei> => {
        const items = await fetchAllPreiseTreibstoffBleifrei();
        return getMostRecentEntry(items);
    };

export const saveAllPreiseTreibstoffBleifrei = async (
    data: PreiseTreibstoffBleifrei[]
) => {
    await saveAll(tableName, data);
};
