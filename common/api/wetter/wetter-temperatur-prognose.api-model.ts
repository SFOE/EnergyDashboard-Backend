import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterTemperaturPrognose } from '/opt/nodejs/models/wetter/wetter-temperatur-prognose.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';

export interface WetterTemperaturPrognoseApi {
    [station: string]: WetterTemperaturPrognoseEntryApi[];
}

interface WetterTemperaturPrognoseEntryApi extends DateModel {
    lufttemperaturPrognose: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (
    records: WetterTemperaturPrognose[]
): WetterTemperaturPrognoseApi => {
    const response = {};
    records.forEach((record) => {
        if (!response[record.station]) {
            response[record.station] = [];
        }

        response[record.station].push(mapToApi(record));
    });

    for (const value of Object.values<WetterTemperaturPrognoseEntryApi[]>(
        response
    )) {
        value.sort(dateSortFn);
    }

    return response;
};

const mapToApi = ({
                      date,
                      lufttemperaturPrognose,
                      lufttemperaturTagesmittelNorm,
                      fiveYearMin,
                      fiveYearMax,
                      differenzNorm,
                      differenzMin,
                      differenzMax
                  }: WetterTemperaturPrognose): WetterTemperaturPrognoseEntryApi => {
    return {
        date,
        lufttemperaturPrognose,
        lufttemperaturTagesmittelNorm,
        fiveYearMin,
        fiveYearMax,
        differenzNorm,
        differenzMin,
        differenzMax
    };
};
