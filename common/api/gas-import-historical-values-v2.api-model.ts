import { GasImportHistoricalValueV2 } from '/opt/nodejs/models/gas-import-historical-values-v2.model';

export interface GasImportHistoricalValuesApiV2 {
    nettoimport: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export const mapToApiModel = (records: GasImportHistoricalValueV2[]): GasImportHistoricalValuesApiV2[] => {
    return records.map(record => mapToApi(record));
};

const mapToApi = ({
    date,
    nettoimport,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax,
}: GasImportHistoricalValueV2): GasImportHistoricalValuesApiV2 => {
    return {
        nettoimport,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date,
        differenzMittelwert,
        differenzMin,
        differenzMax,
    }
}
