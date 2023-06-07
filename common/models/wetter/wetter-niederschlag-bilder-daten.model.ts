import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface WetterNiederschlagBilderDatenSource {
    this_month: string;
    last_month: string;
    data_status: string;
}

export interface WetterNiederschlagBilderDaten extends BaseModel, DateModel {
    thisMonth: number;
    lastMonth: number;
}

export const map = (
    source: WetterNiederschlagBilderDatenSource
): WetterNiederschlagBilderDaten => {
    return {
        id: getUuid(),
        date: source.data_status,
        thisMonth: parseFloat(source.this_month),
        lastMonth: parseFloat(source.last_month)
    };
};