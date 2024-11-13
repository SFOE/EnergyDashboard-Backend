import { EntkoppelungEndenergieverbrauchBIP } from '../../models/strom/strom-entkoppelung-endenergieverbrauch-bip.model';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';

const tableName = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_ENTKOPPELUNG_ENDENERGIEVERBRAUCH_BIP]
);

export const fetchAllEntkoppelungEndenergieverbrauchBIP = async (): Promise<
    EntkoppelungEndenergieverbrauchBIP[]
> => {
    const entries = await fetchAll<EntkoppelungEndenergieverbrauchBIP>(
        tableName
    );
    return entries.sort(yearSortFn);
};

export const saveAllEntkoppelungEndenergieverbrauchBIP = async (
    data: EntkoppelungEndenergieverbrauchBIP[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllEntkoppelungEndenergieverbrauchBIP = async () => {
    await deleteAll(tableName);
};

const yearSortFn = (a: { year: number }, b: { year: number }) =>
    a.year - b.year;
