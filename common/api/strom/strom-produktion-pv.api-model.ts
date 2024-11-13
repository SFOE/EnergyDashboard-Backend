import { DateModel } from '/opt/nodejs/models/base/date.model';
import { StromProduktionPv } from '/opt/nodejs/models/strom/strom-produktion-pv.model';

export interface StromProduktionPvApi extends DateModel {
    stromProduktion: number;
    haushalteProJahr: number;
}

export const mapToApiModel = (
    records: StromProduktionPv[]
): StromProduktionPvApi[] => {
    return records.map((record) => mapToApi(record));
};

const mapToApi = ({
    date,
    stromProduktion,
    haushalteProJahr
}: StromProduktionPv): StromProduktionPvApi => ({
    date,
    stromProduktion,
    haushalteProJahr
});
