import { mapPreisCommon, PreiseCommon } from './preise.common.model';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseGasBoerseSource {
    Datum: string;
    Preis_Boerse_indexiert: string;
}

export interface PreiseGasBoerse extends PreiseCommon {
    preisIndexiert: number;
}

export const map = (records: PreiseGasBoerseSource[]): PreiseGasBoerse[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (record: PreiseGasBoerseSource): PreiseGasBoerse =>
    mapPreisCommon(record.Preis_Boerse_indexiert, record.Datum);
