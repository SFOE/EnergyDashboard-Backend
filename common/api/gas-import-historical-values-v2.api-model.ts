import { DateModel } from '../models/base/date.model';
import { FiveYearWithDiffStatisticsModel } from '../models/base/statistics.model';
import { GasImportHistoricalValueV2 } from '/opt/nodejs/models/gas-import-historical-values-v2.model';

export interface GasImportHistoricalValuesApiV2
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    nettoimport: number | null;
}

export const mapToApiModel = (
    records: GasImportHistoricalValueV2[]
): GasImportHistoricalValuesApiV2[] => {
    return records.map((record) => mapToApi(record));
};

const mapToApi = ({
    date,
    nettoimport,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax
}: GasImportHistoricalValueV2): GasImportHistoricalValuesApiV2 => {
    return {
        nettoimport,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date,
        differenzMittelwert,
        differenzMin,
        differenzMax
    };
};
