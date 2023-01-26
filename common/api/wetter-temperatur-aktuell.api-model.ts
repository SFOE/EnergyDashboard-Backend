import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter-temperatur-aktuell.model';

export interface WetterTemperaturAktuellApi {
    [station: string]: WetterTemperaturAktuellEntryApi[];
}

interface WetterTemperaturAktuellEntryApi {
    datum: string;
    lufttemperaturTagesmittel: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: WetterTemperaturAktuell[]): WetterTemperaturAktuellApi => {
    const response = {};
    records.forEach(record => {
        if (!response[record.station]) {
            response[record.station] = [];
        }

        response[record.station].push(mapToApi(record));
    })

    for (const value of Object.values<WetterTemperaturAktuellEntryApi[]>(response)) {
        value.sort(sortFn);
    }

    return response;
};

const mapToApi = ({
    datum,
    lufttemperaturTagesmittel,
    lufttemperaturTagesmittelNorm,
    fiveYearMin,
    fiveYearMax,
    differenzNorm,
    differenzMin,
    differenzMax,
}: WetterTemperaturAktuell): WetterTemperaturAktuellEntryApi => {
    return {
        datum,
        lufttemperaturTagesmittel,
        lufttemperaturTagesmittelNorm,
        fiveYearMin,
        fiveYearMax,
        differenzNorm,
        differenzMin,
        differenzMax,
    }
}

const sortFn = (a: WetterTemperaturAktuellEntryApi, b: WetterTemperaturAktuellEntryApi) => new Date(a.datum).getTime() - new Date(b.datum).getTime();
