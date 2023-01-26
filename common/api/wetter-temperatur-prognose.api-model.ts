import { WetterTemperaturPrognose } from '/opt/nodejs/models/wetter-temperatur-prognose.model';

export interface WetterTemperaturPrognoseApi {
    [station: string]: WetterTemperaturPrognoseEntryApi[];
}

interface WetterTemperaturPrognoseEntryApi {
    datum: string;
    lufttemperaturPrognose: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: WetterTemperaturPrognose[]): WetterTemperaturPrognoseApi => {
    const response = {};
    records.forEach(record => {
        if (!response[record.station]) {
            response[record.station] = [];
        }

        response[record.station].push(mapToApi(record));
    })

    for (const value of Object.values<WetterTemperaturPrognoseEntryApi[]>(response)) {
        value.sort(sortFn);
    }

    return response;
};

const mapToApi = ({
    datum,
    lufttemperaturPrognose,
    lufttemperaturTagesmittelNorm,
    fiveYearMin,
    fiveYearMax,
    differenzNorm,
    differenzMin,
    differenzMax,
}: WetterTemperaturPrognose): WetterTemperaturPrognoseEntryApi => {
    return {
        datum,
        lufttemperaturPrognose,
        lufttemperaturTagesmittelNorm,
        fiveYearMin,
        fiveYearMax,
        differenzNorm,
        differenzMin,
        differenzMax,
    }
}

const sortFn = (a: WetterTemperaturPrognoseEntryApi, b: WetterTemperaturPrognoseEntryApi) => new Date(a.datum).getTime() - new Date(b.datum).getTime();
