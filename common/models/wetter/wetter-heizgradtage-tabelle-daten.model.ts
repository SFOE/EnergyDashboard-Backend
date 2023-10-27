import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface WetterHeizgradtageTabelleDatenSource {
    observation: string;
    forecast: string;
    estimate: string;
}

export interface WetterHeizgradtageTabelleDaten extends BaseModel, DateModel {
    observation: string;
    forecast: string;
    estimate: string;
}

export const map = (
    records: WetterHeizgradtageTabelleDatenSource[]
): WetterHeizgradtageTabelleDaten[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterHeizgradtageTabelleDatenSource
): WetterHeizgradtageTabelleDaten => {
    return {
        id: getUuid(),
        date: new Date().toISOString(),
        observation: source.observation,
        forecast: source.forecast,
        estimate: source.estimate
    };
};
