import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromProduktionPvSource {
    Jahr: string;
    PV_produktion_GWh: string;
    Haushalte_Jahr: string;
}

export interface StromProduktionPv extends BaseModel, DateModel {
    stromProduktion: number;
    haushalteProJahr: number;
}

export const map = (
    records: StromProduktionPvSource[]
): StromProduktionPv[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: StromProduktionPvSource
): StromProduktionPv => {
    return {
        id: getUuid(),
        date: source.Jahr,
        stromProduktion: parseFloat(source.PV_produktion_GWh),
        haushalteProJahr: parseFloat(source.Haushalte_Jahr)
    };
};