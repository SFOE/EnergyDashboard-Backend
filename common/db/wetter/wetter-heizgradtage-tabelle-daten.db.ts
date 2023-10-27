import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { WetterHeizgradtageTabelleDaten } from '../../models/wetter/wetter-heizgradtage-tabelle-daten.model';
import { sortFn } from '../../utils/preise.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.WETTER_HEIZGRADTAGE_TABELLE_DATEN]
);

export const getMostRecentEntry =
    async (): Promise<WetterHeizgradtageTabelleDaten> => {
        var entries = await fetchAllWetterHeizgradtageTabelleDaten();
        entries.sort(sortFn);
        return entries[entries.length - 1];
    };

const fetchAllWetterHeizgradtageTabelleDaten = async (): Promise<
    WetterHeizgradtageTabelleDaten[]
> => {
    return fetchAll(tableName);
};

export const saveAllWetterHeizgradtageTabelleDaten = async (
    data: WetterHeizgradtageTabelleDaten[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWetterHeizgradtageTabelleDaten = async () => {
    await deleteAll(tableName);
};
