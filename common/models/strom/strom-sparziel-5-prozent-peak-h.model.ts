import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromSparziel5ProzentPeakHSource {
    Year: string;
    Month: string;
    Weekday: string;
    Hour: string;
    Saved_percent: string;
    Anteil_Private: string;
    Anteil_KMU: string;
    Anteil_Industrie: string;
}

export interface StromSparziel5ProzentPeakH extends BaseModel {
    year: number;
    month: number;
    weekday: number;
    hour: number;
    savedPercent: number;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
}

export const map = (
    records: StromSparziel5ProzentPeakHSource[]
): StromSparziel5ProzentPeakH[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (record: StromSparziel5ProzentPeakHSource): StromSparziel5ProzentPeakH => {
    return {
        id: getUuid(),
        year: parseInt(record.Year),
        month: parseInt(record.Month),
        weekday: parseInt(record.Weekday),
        hour: parseInt(record.Hour),
        savedPercent: parseFloat(record.Saved_percent),
        anteilPrivate: parseFloat(record.Anteil_Private),
        anteilKMU: parseFloat(record.Anteil_KMU),
        anteilIndustrie: parseFloat(record.Anteil_Industrie)
    };
};
