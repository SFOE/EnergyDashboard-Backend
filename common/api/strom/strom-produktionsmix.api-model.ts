import { DateModel } from '/opt/nodejs/models/base/date.model';
import { StromProduktionsMix } from '/opt/nodejs/models/strom/strom-produktionsmix.model';
import { getMostRecentDate } from '/opt/nodejs/utils/date.utils';

export interface StromProduktionsMixApi extends DateModel {
    [year: number]: StromProduktionsMixEntryApi;
}

export interface StromProduktionsMixEntryApi {
    kumuliertEigenproduktion: number;
    kumuliertKernkraft: number;
    kumuliertThermische: number;
    kumuliertFlusskraft: number;
    kumuliertSpeicherkraft: number;
    kumuliertWind: number;
    kumuliertPhotovoltaik: number;
    anteilKernkraft: number;
    anteilThermische: number;
    anteilFlusskraft: number;
    anteilSpeicherkraft: number;
    anteilWind: number;
    anteilPhotovoltaik: number;
}

export const mapToApiModel = (
    entries: StromProduktionsMix[]
): StromProduktionsMixApi => {
    const date = getMostRecentDate(entries);
    const stromProduktionsMix: StromProduktionsMixApi = {
        date: date
    };

    entries.forEach((entry) => {
        const mappedEntry = mapEntry(entry);
        const year = new Date(entry.date).getFullYear();
        stromProduktionsMix[year] = mappedEntry;
    });
    return stromProduktionsMix;
};

const mapEntry = (entry: StromProduktionsMix): StromProduktionsMixEntryApi => ({
    kumuliertEigenproduktion: entry.kumuliertEigenproduktion,
    kumuliertKernkraft: entry.kumuliertKernkraft,
    kumuliertThermische: entry.kumuliertThermische,
    kumuliertFlusskraft: entry.kumuliertFlusskraft,
    kumuliertSpeicherkraft: entry.kumuliertSpeicherkraft,
    kumuliertWind: entry.kumuliertWind,
    kumuliertPhotovoltaik: entry.kumuliertPhotovoltaik,
    anteilKernkraft: entry.anteilKernkraft,
    anteilThermische: entry.anteilThermische,
    anteilFlusskraft: entry.anteilFlusskraft,
    anteilSpeicherkraft: entry.anteilSpeicherkraft,
    anteilWind: entry.anteilWind,
    anteilPhotovoltaik: entry.anteilPhotovoltaik
});
