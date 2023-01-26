import { GasImportExportCountries, GasImportKarte } from '/opt/nodejs/models/gas-import-karte.model';
import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface GasImportKarteApi {
    datum: Date;
    import: GasImportExportCountries;
    export: GasImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
}

export const mapToApiModel = (record: GasImportKarte): GasImportKarteApi => {
    return {
        datum: new Date(record.datum),
        import: record.import,
        export: record.export,
        nettoImportCH: record.nettoImportCH,
        trend: record.trend,
        trendRating: record.trendRating,
    }
}
