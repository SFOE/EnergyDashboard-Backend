import { GasImportHistoricalValue } from '/opt/nodejs/models/gas-import-historical-values.model';
import { mapDateYearAndMonth } from '../utils/date.utils';

export interface GasImportHistoricalValuesApi {
    nettoimport: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: GasImportHistoricalValue[]): GasImportHistoricalValuesApi[] => {
    return records.map(record => mapToApi(record));
};

const mapToApi = ({
    monat,
    jahr,
    nettoimport,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax,
}: GasImportHistoricalValue): GasImportHistoricalValuesApi => {
    return {
        nettoimport,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date: mapDateYearAndMonth(jahr, monat),
        differenzMittelwert,
        differenzMin,
        differenzMax,
    }
}
