import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterTemperaturAktuell } from '/opt/nodejs/models/wetter/wetter-temperatur-aktuell.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export interface WetterTemperaturAktuellApi {
    [station: string]: WetterTemperaturAktuellEntryApi[];
}

interface WetterTemperaturAktuellEntryApi extends DateModel {
    lufttemperaturTagesmittel: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (
    records: WetterTemperaturAktuell[]
): WetterTemperaturAktuellApi => {
    const response = {};
    records.forEach((record) => {
        if (!response[record.station]) {
            response[record.station] = [];
        }

        response[record.station].push(mapToApi(record));
    });

    for (const value of Object.values<WetterTemperaturAktuellEntryApi[]>(
        response
    )) {
        value.sort(dateSortFn);
    }

    return response;
};

const mapToApi = ({
                      date,
                      lufttemperaturTagesmittel,
                      lufttemperaturTagesmittelNorm,
                      fiveYearMin,
                      fiveYearMax,
                      differenzNorm,
                      differenzMin,
                      differenzMax
                  }: WetterTemperaturAktuell): WetterTemperaturAktuellEntryApi => {
    return {
        date,
        lufttemperaturTagesmittel,
        lufttemperaturTagesmittelNorm,
        fiveYearMin,
        fiveYearMax,
        differenzNorm,
        differenzMin,
        differenzMax
    };
};
