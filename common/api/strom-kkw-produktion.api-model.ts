import { StromKkwAusfallV1 } from '/opt/nodejs/models/strom/strom-kkw-ausfall.model';
import { StromKkwProduktionV1 } from '/opt/nodejs/models/strom/strom-kkw-produktion.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export interface StromKkwProduktionApi {
    entries: StromKkwProduktionV1[];
    ausfaelle: StromKkwAusfallV1[];
}

export const mapToApiModel = (productionRecords: StromKkwProduktionV1[], ausfallRecords: StromKkwAusfallV1[]): StromKkwProduktionApi => {
    return {
        entries: productionRecords.sort(dateSortFn),
        ausfaelle: ausfallRecords
    };
};

