import { DateModel } from '../base/date.model';
import { Trend, TrendRating } from '/opt/nodejs/models/base/trend.enum';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromImportExportUebersichtSource {
    Datum: string;
    Import_GWh: string;
    Export_GWh: string;
    Nettoimport_GWh: string;
    Trend_Import: string;
    Trend_Export: string;
    Trend_Nettoimport: string;
    TrendRating_Import: string;
    TrendRating_Export: string;
    TrendRating_Nettoimport: string;
}

export interface StromImportExportUebersicht extends BaseModel, DateModel {
    importGWh: number;
    exportGWh: number;
    nettoimportGWh: number;
    trendImport: Trend;
    trendRatingImport: TrendRating;
    trendExport: Trend;
    trendRatingExport: TrendRating;
    trendNettoimport: Trend;
    trendRatingNettoimport: TrendRating;
}

export const map = (
    records: StromImportExportUebersichtSource[]
): StromImportExportUebersicht[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (
    record: StromImportExportUebersichtSource
): StromImportExportUebersicht => ({
    id: getUuid(),
    date: record.Datum,
    importGWh: parseFloat(record.Import_GWh),
    exportGWh: parseFloat(record.Export_GWh),
    nettoimportGWh: parseFloat(record.Nettoimport_GWh),
    trendImport: Trend[record.Trend_Import],
    trendRatingImport: TrendRating[record.TrendRating_Import],
    trendExport: Trend[record.Trend_Export],
    trendRatingExport: TrendRating[record.TrendRating_Export],
    trendNettoimport: Trend[record.Trend_Nettoimport],
    trendRatingNettoimport: TrendRating[record.TrendRating_Nettoimport]
});
