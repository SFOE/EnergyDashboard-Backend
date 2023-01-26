import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';

export interface StromImportExportUebersichtSource {
    Datum: string;
    Import_GWh: string;
    Export_GWh: string;
    Trend_Import: string;
    Trend_Export: string;
    TrendRating_Import: string;
    TrendRating_Export: string;
}

export interface StromImportExportUebersicht {
    datum: string;
    importGWh: number;
    exportGWh: number;
    trendImport: Trend;
    trendRatingImport: TrendRating;
    trendExport: Trend;
    trendRatingExport: TrendRating;
}

export const map = (records: StromImportExportUebersichtSource[]): StromImportExportUebersicht[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromImportExportUebersichtSource): StromImportExportUebersicht => ({
    datum: record.Datum,
    importGWh: parseFloat(record.Import_GWh),
    exportGWh: parseFloat(record.Export_GWh),
    trendImport: Trend[record.Trend_Import],
    trendRatingImport: TrendRating[record.TrendRating_Import],
    trendExport: Trend[record.Trend_Export],
    trendRatingExport: TrendRating[record.TrendRating_Export],
})
