import { DateModel } from '/opt/nodejs/models/base/date.model';
import { GasImportEuropaTaeglich } from '/opt/nodejs/models/gas/gas-import-europa-taeglich.model';

export interface GasImportEuropaTaeglichApi extends DateModel {
    norway: number;
    algeria: number;
    russia: number;
    azerbaijan: number;
    uk: number;
    lng: number;
}

export const mapToApiModel = (
    records: GasImportEuropaTaeglich[]
): GasImportEuropaTaeglichApi[] => {
    return records.map((record) => mapToApi(record));
};

export const mapToApi = (record: GasImportEuropaTaeglich): GasImportEuropaTaeglichApi => {
    return {
        date: record.date,
        norway: record.norway,
        algeria: record.algeria,
        russia: record.russia,
        azerbaijan: record.azerbaijan,
        uk: record.uk,
        lng: record.lng
    };
};
