import { StromKkwAusfallV1 } from '/opt/nodejs/models/strom/strom-kkw-ausfall.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { StromKkwVerfuegbarkeit } from '/opt/nodejs/models/strom/strom-kkw-verfuegbarkeit.model';

export interface StromKkwVerfuegbarkeitApi {
    entries: StromKkwVerfuegbarkeit[];
    ausfaelle: StromKkwAusfallV1[];
}

export const mapToApiModel = (verfuegbarkeitRecords: StromKkwVerfuegbarkeit[], ausfallRecords: StromKkwAusfallV1[]): StromKkwVerfuegbarkeitApi => {
    return {
        entries: verfuegbarkeitRecords.sort(dateSortFn),
        ausfaelle: ausfallRecords
    };
};

