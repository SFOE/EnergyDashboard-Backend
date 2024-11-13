import { getUuid } from '../../utils/id.utils';
import { BaseModel } from '../base/base.model';

export interface EntkoppelungEndenergieverbrauchBIPSource {
    Jahr: string;
    Heizgradtage_index: string;
    BIP_index: string;
    Bevoelkerung_index: string;
    Endenergieverbrauch_index: string;
}

export interface EntkoppelungEndenergieverbrauchBIP extends BaseModel {
    year: number;
    heizgradtageIndex: number;
    bipIndex: number;
    bevoelkerungIndex: number;
    endenergieverbrauchIndex: number;
}

export const map = (
    records: EntkoppelungEndenergieverbrauchBIPSource[]
): EntkoppelungEndenergieverbrauchBIP[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: EntkoppelungEndenergieverbrauchBIPSource
): EntkoppelungEndenergieverbrauchBIP => ({
    id: getUuid(),
    year: parseInt(record.Jahr),
    heizgradtageIndex: parseFloat(record.Heizgradtage_index),
    bipIndex: parseFloat(record.BIP_index),
    bevoelkerungIndex: parseFloat(record.Bevoelkerung_index),
    endenergieverbrauchIndex: parseFloat(record.Endenergieverbrauch_index)
});
