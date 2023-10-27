import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromSparziel5ProzentEinsparungenSourceV2 {
    Total_reference_demand_GWh: string;
    Total_savings_GWh: string;
    Total_saving_privat_percent: string;
    Total_saving_kmu_percent: string;
    Total_saving_industrie_percent: string;
}

export interface StromSparziel5ProzentEinsparungenV2 extends BaseModel {
    totalReferenceDemandGWh: number;
    totalSavingsGWh: number;
    totalSavingPrivatPercent: number;
    totalSavingKmuPercent: number;
    totalSavingIndustriePercent: number;
}

export const map = (
    record: StromSparziel5ProzentEinsparungenSourceV2
): StromSparziel5ProzentEinsparungenV2 => {
    return {
        id: getUuid(),
        totalReferenceDemandGWh: parseFloat(record.Total_reference_demand_GWh),
        totalSavingsGWh: parseFloat(record.Total_savings_GWh),
        totalSavingPrivatPercent: parseFloat(
            record.Total_saving_privat_percent
        ),
        totalSavingKmuPercent: parseFloat(record.Total_saving_kmu_percent),
        totalSavingIndustriePercent: parseFloat(
            record.Total_saving_industrie_percent
        )
    };
};
