import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface GasImportEuropaJaehrlichSource {
    jahr: string;
    land: string;
    mill_m3: string;
    prozent: string;
    stand: string;
}

export interface GasImportEuropaJaehrlich extends BaseModel {
    jahr: number;
    land: string;
    millM3: number;
    prozent: number;
    stand: string;
}

export const map = (
    records: GasImportEuropaJaehrlichSource[]
): GasImportEuropaJaehrlich[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: GasImportEuropaJaehrlichSource
): GasImportEuropaJaehrlich => ({
    id: getUuid(),
    jahr: parseInt(record.jahr),
    land: record.land,
    millM3: parseFloat(record.mill_m3),
    prozent: parseFloat(record.prozent),
    stand: record.stand
});
