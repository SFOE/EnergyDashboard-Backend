import { SourceFiles } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { deleteAll, fetchAll, saveAll } from '/opt/nodejs/db/db-requests';
import { DynamoDBTables } from '/opt/nodejs/db/db-tables';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { StromWinterproduktionEinzelneEnergietraeger } from '/opt/nodejs/models/strom/strom-winterproduktion-einzelne-energietraeger.model';

const tableName: string = withEnvPrefix(
    DynamoDBTables[SourceFiles.STROM_WINTERPRODUKTION_EINZELNE_ENERGIETRAEGER]
);

export const fetchAllStromWinterproduktionEinzelneEnergietraeger =
    async (): Promise<StromWinterproduktionEinzelneEnergietraeger[]> => {
        const entries: StromWinterproduktionEinzelneEnergietraeger[] =
            await fetchAll<StromWinterproduktionEinzelneEnergietraeger>(
                tableName
            );
        return entries.sort(dateSortFn);
    };

export const saveAllStromWinterproduktionEinzelneEnergietraeger = async (
    data: StromWinterproduktionEinzelneEnergietraeger[]
) => {
    await saveAll(tableName, data);
};

export const deleteAllWinterproduktionEinzelneEnergietraeger = async () => {
    await deleteAll(tableName);
};
