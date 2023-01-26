import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface WetterTemperaturAktuellSource {
    Station: string;
    Datum: string;
    Luftemperatur_Tagesmittel: string;
    Luftemperatur_Tagesmittel_Norm: string;
    '5y_Min': string;
    '5y_Max': string;
    Differenz_Norm: string;
    Differenz_min: string;
    Differenz_max: string;
}

export interface WetterTemperaturAktuell {
    id: string
    station: string;
    datum: string;
    lufttemperaturTagesmittel: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const map = (records: WetterTemperaturAktuellSource[]): WetterTemperaturAktuell[] => {
    return records.map(record => mapEntry(record));
}

const mapEntry = (source: WetterTemperaturAktuellSource): WetterTemperaturAktuell => {
    return {
        id: createId(source.Station, source.Datum),
        station: source.Station,
        datum: source.Datum,
        lufttemperaturTagesmittel: parseFloatOrNullForNA(source.Luftemperatur_Tagesmittel),
        lufttemperaturTagesmittelNorm: parseFloat(source.Luftemperatur_Tagesmittel_Norm),
        fiveYearMin: parseFloat(source['5y_Min']),
        fiveYearMax: parseFloat(source['5y_Max']),
        differenzNorm: parseFloatOrNullForNA(source.Differenz_Norm),
        differenzMin: parseFloatOrNullForNA(source.Differenz_min),
        differenzMax: parseFloatOrNullForNA(source.Differenz_max),
    };
}

export const createId = (station: string, date: string) => {
    return `${station}-${date}`;
}

