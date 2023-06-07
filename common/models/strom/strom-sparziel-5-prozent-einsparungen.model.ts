import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromSparziel5ProzentEinsparungenSource {
    Total_measured_demand_GWh: string;
    Total_reference_demand_GWh: string;
    Total_savings_GWh: string;
    Average_hourly_savings_percent: string;
    Total_saving_privat_GWh: string;
    Total_saving_kmu_GWh: string;
    Total_saving_industrie_GWh: string;
}

export interface StromSparziel5ProzentEinsparungen extends BaseModel {
    totalMeasuredDemandGWh: number;
    totalReferenceDemandGWh: number;
    totalSavingsGWh: number;
    averageHourlySavingsPercent: number;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
}

export const map = (record: StromSparziel5ProzentEinsparungenSource): StromSparziel5ProzentEinsparungen => {

    return {
        id: getUuid(),
        totalMeasuredDemandGWh: parseFloat(record.Total_measured_demand_GWh),
        totalReferenceDemandGWh: parseFloat(record.Total_reference_demand_GWh),
        totalSavingsGWh: parseFloat(record.Total_savings_GWh),
        averageHourlySavingsPercent: parseFloat(record.Average_hourly_savings_percent),
        anteilPrivate: parseFloat(record.Total_saving_privat_GWh),
        anteilKMU: parseFloat(record.Total_saving_kmu_GWh),
        anteilIndustrie: parseFloat(record.Total_saving_industrie_GWh)
    };
};
