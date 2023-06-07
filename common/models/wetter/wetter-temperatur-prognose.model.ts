import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface WetterTemperaturPrognoseSource {
    Station: string;
    Datum: string;
    Luftemperatur_Prognose: string;
    Luftemperatur_Tagesmittel_Norm: string;
    '5y_Min': string;
    '5y_Max': string;
    Differenz_Norm: string;
    Differenz_min: string;
    Differenz_max: string;
}

export interface WetterTemperaturPrognose extends BaseModel, DateModel {
    station: string;
    lufttemperaturPrognose: number;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number;
    differenzMin: number;
    differenzMax: number;
}

export const map = (
    records: WetterTemperaturPrognoseSource[]
): WetterTemperaturPrognose[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterTemperaturPrognoseSource,
): WetterTemperaturPrognose => {
    return {
        id: getUuid(),
        station: source.Station,
        date: source.Datum,
        lufttemperaturPrognose: parseFloatOrNullForNA(
            source.Luftemperatur_Prognose
        ),
        lufttemperaturTagesmittelNorm: parseFloat(
            source.Luftemperatur_Tagesmittel_Norm
        ),
        fiveYearMin: parseFloat(source['5y_Min']),
        fiveYearMax: parseFloat(source['5y_Max']),
        differenzNorm: parseFloatOrNullForNA(source.Differenz_Norm),
        differenzMin: parseFloatOrNullForNA(source.Differenz_min),
        differenzMax: parseFloatOrNullForNA(source.Differenz_max)
    };
};
