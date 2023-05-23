import { DateModel } from '../models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '../models/base/statistics.model';
import { mapDateYearAndMonth } from '../utils/date.utils';
import { GasImportHistoricalValue } from '/opt/nodejs/models/gas-import-historical-values.model';

export interface GasImportHistoricalValuesApi
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    nettoimport: number | null;
}

export const mapToApiModel = (
    records: GasImportHistoricalValue[]
): GasImportHistoricalValuesApi[] => {
    return records.map((record) => mapToApi(record));
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
    differenzMax
}: GasImportHistoricalValue): GasImportHistoricalValuesApi => {
    return {
        nettoimport,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date: mapDateYearAndMonth(jahr, monat),
        differenzMittelwert,
        differenzMin,
        differenzMax
    };
};
