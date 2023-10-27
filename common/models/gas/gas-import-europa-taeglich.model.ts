import { DateModel } from '../base/date.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface GasImportEuropaTaeglichSource {
    datum: string;
    Norway: string;
    Algeria: string;
    LNG: string;
    Russia: string;
    Azerbaijan: string;
    UK: string;
}

export interface GasImportEuropaTaeglich extends BaseModel, DateModel {
    norway: number;
    algeria: number;
    russia: number;
    azerbaijan: number;
    uk: number;
    lng: number;
}

export const map = (records: GasImportEuropaTaeglichSource[]): GasImportEuropaTaeglich[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (record: GasImportEuropaTaeglichSource): GasImportEuropaTaeglich => ({
    id: getUuid(),
    date: record.datum,
    norway: parseFloatOrNullForNA(record.Norway),
    algeria: parseFloatOrNullForNA(record.Algeria),
    russia: parseFloatOrNullForNA(record.Russia),
    azerbaijan: parseFloatOrNullForNA(record.Azerbaijan),
    uk: parseFloatOrNullForNA(record.UK),
    lng: parseFloatOrNullForNA(record.LNG)
});
