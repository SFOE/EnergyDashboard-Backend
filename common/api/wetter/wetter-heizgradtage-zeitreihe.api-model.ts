import { DateModel } from '/opt/nodejs/models/base/date.model';
import { dateSortFn } from '/opt/nodejs/utils/sort.utils';
import { WetterHeizgradtageZeitreihe } from '/opt/nodejs/models/wetter/wetter-heizgradtage-zeitreihe.model';

export interface WetterHeizgradtageZeitreiheApi {
    [station: string]: WetterHeizgradtageZeitreiheEntryApi[];
}

interface WetterHeizgradtageZeitreiheEntryApi extends DateModel {
    normKumulativMin: number;
    normKumulativMittelwert: number;
    normKumulativMax: number;
    messungPrognoseKumulativMin: number;
    messungPrognoseKumulativMittelwert: number;
    messungPrognoseKumulativMax: number;
}

export const mapToApiModel = (
    records: WetterHeizgradtageZeitreihe[]
): WetterHeizgradtageZeitreiheApi => {
    const response = {};
    records.forEach((record) => {
        if (!response[record.station]) {
            response[record.station] = [];
        }

        response[record.station].push(mapToApi(record));
    });

    for (const value of Object.values<WetterHeizgradtageZeitreiheEntryApi[]>(
        response
    )) {
        value.sort(dateSortFn);
    }

    return response;
};

const mapToApi = (
    {
        date,
        normKumulativMin,
        normKumulativMittelwert,
        normKumulativMax,
        messungPrognoseKumulativMin,
        messungPrognoseKumulativMittelwert,
        messungPrognoseKumulativMax
    }: WetterHeizgradtageZeitreihe): WetterHeizgradtageZeitreiheEntryApi => {
    return {
        date,
        normKumulativMin,
        normKumulativMittelwert,
        normKumulativMax,
        messungPrognoseKumulativMin,
        messungPrognoseKumulativMittelwert,
        messungPrognoseKumulativMax
    };
};
