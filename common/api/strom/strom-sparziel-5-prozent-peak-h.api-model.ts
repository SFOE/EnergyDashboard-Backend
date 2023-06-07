import { StromSparziel5ProzentPeakH } from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-peak-h.model';

export interface StromSparziel5ProzentPeakHApiModel {
    year: number;
    month: number;
    peakDays: StromSparziel5ProzentPeakDayApiModel[];
}

export interface StromSparziel5ProzentPeakDayApiModel {
    weekday: number;
    hour: number;
    savedPercent: number;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
}

export const mapToApiModel = (input: StromSparziel5ProzentPeakH[]): StromSparziel5ProzentPeakHApiModel[] => {
    const result: StromSparziel5ProzentPeakHApiModel[] = [];

    input.forEach((item) => {
        const existingApiModel = result.find((apiModel) => apiModel.year === item.year && apiModel.month === item.month);

        if (existingApiModel) {
            existingApiModel.peakDays.push(mapPeakDay(item));
        } else {
            result.push({
                year: item.year,
                month: item.month,
                peakDays: [
                    mapPeakDay(item)
                ]
            });
        }
    });

    return result;
};

const mapPeakDay = (item: StromSparziel5ProzentPeakH): StromSparziel5ProzentPeakDayApiModel => ({
    weekday: item.weekday,
    hour: item.hour,
    savedPercent: item.savedPercent,
    anteilPrivate: item.anteilPrivate,
    anteilKMU: item.anteilKMU,
    anteilIndustrie: item.anteilIndustrie
});