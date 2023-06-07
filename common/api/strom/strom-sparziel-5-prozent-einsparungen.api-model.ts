import {
    StromSparziel5ProzentEinsparungen
} from '/opt/nodejs/models/strom/strom-sparziel-5-prozent-einsparungen.model';

export interface StromSparziel5ProzentEinsparungenApiModel {
    totalMeasuredDemandGWh: number;
    totalReferenceDemandGWh: number;
    totalSavingsGWh: number;
    averageHourlySavingsPercent: number;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
}

export const mapToApiModel = (input: StromSparziel5ProzentEinsparungen): StromSparziel5ProzentEinsparungenApiModel => ({
    totalMeasuredDemandGWh: input.totalMeasuredDemandGWh,
    totalReferenceDemandGWh: input.totalReferenceDemandGWh,
    totalSavingsGWh: input.totalSavingsGWh,
    averageHourlySavingsPercent: input.averageHourlySavingsPercent,
    anteilPrivate: input.anteilPrivate,
    anteilKMU: input.anteilKMU,
    anteilIndustrie: input.anteilIndustrie
});