import { DateModel } from '/opt/nodejs/models/base/date.model';
import { GasImportExportCountries, GasImportKarte } from '/opt/nodejs/models/gas/gas-import-karte.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';

export interface GasImportKarteApi extends DateModel {
    import: GasImportExportCountries;
    export: GasImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const mapToApiModel = (record: GasImportKarte): GasImportKarteApi => {
    return {
        date: record.date,
        import: record.import,
        export: record.export,
        nettoImportCH: record.nettoImportCH,
        trend: record.trend,
        trendRating: record.trendRating
    };
};
