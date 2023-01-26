import { fetch, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { GasImportKarte } from '/opt/nodejs/models/gas-import-karte.model';
import { GasSparzielZiel } from '/opt/nodejs/models/gas-sparziel-ziel.model';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_SPARZIEL_ZIEL]);

export const fetchGasSparzielZiel = async (): Promise<GasSparzielZiel> => {
    const allEntries = await fetchAll<GasSparzielZiel>(tableName);
    allEntries.sort(sortFn);
    return allEntries[allEntries.length - 1];
}

const sortFn = (a: GasSparzielZiel, b: GasSparzielZiel) => a.standJahr - b.standJahr || a.standMonat - b.standMonat

export const saveGasSparzielZiel = async (data: GasSparzielZiel) => {
    await saveAll(tableName, [data]);
}
