import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { getNextIndexForKey } from '/opt/nodejs/utils/objects.utils';

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

export interface WetterTemperaturPrognose {
    id: string
    station: string;
    datum: string;
    lufttemperaturPrognose: number;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number;
    differenzMin: number;
    differenzMax: number;
}

export const map = (records: WetterTemperaturPrognoseSource[]): WetterTemperaturPrognose[] => {
    const stationIndices = {};
    return records.map((record) => mapEntry(record, stationIndices));
}

const mapEntry = (source: WetterTemperaturPrognoseSource, stationIndices: object): WetterTemperaturPrognose => {
    return {
        id: createId(source.Station, stationIndices),
        station: source.Station,
        datum: source.Datum,
        lufttemperaturPrognose: parseFloatOrNullForNA(source.Luftemperatur_Prognose),
        lufttemperaturTagesmittelNorm: parseFloat(source.Luftemperatur_Tagesmittel_Norm),
        fiveYearMin: parseFloat(source['5y_Min']),
        fiveYearMax: parseFloat(source['5y_Max']),
        differenzNorm: parseFloatOrNullForNA(source.Differenz_Norm),
        differenzMin: parseFloatOrNullForNA(source.Differenz_min),
        differenzMax: parseFloatOrNullForNA(source.Differenz_max),
    };
}

export const createId = (station: string, stationIndices: object) => {
    return `${station}-${getNextIndexForKey(station, stationIndices)}`;
}
