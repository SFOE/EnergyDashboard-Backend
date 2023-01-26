import { fetchAll, getItem, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { createId, GasSparzielAktuelleEinsparung } from '/opt/nodejs/models/gas-sparziel-aktuelle-einsparung.model';
import { GetCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/GetCommand';
import { SourceFiles } from '../source-files';
import { withEnvPrefix } from '../utils/env.utils';

const tableName = withEnvPrefix(DynamoDBTables[SourceFiles.GAS_SPARZIEL_AKTUELLE_EINSPARUNG]);

export const fetchAllGasSparzielAktuelleEinsparung = async (): Promise<GasSparzielAktuelleEinsparung[]> => {
    return fetchAll(tableName);
}


export const saveGasSparzielAktuelleEinsparung = async (data: GasSparzielAktuelleEinsparung[]) => {
    await saveAll(tableName, data);
}
