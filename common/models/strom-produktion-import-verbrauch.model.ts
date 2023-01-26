import { Trend, TrendRating } from '/opt/nodejs/models/trend.enum';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromProduktionImportVerbrauchSource {
    Datum: string;
    Stromverbrauch: string;
    Kernkraft: string;
    Thermische: string;
    Flusskraft: string;
    Speicherkraft: string;
    Wind: string;
    Photovoltaik: string;
    Eigenproduktion_GWh: string;
    Nettoimporte: string;
    MA_Trend: string;
    Trend: string;
    TrendRating: string;
}

export interface StromProduktionImportVerbrauch {
    datum: string;
    stromverbrauch: number;
    kernkraft: number;
    thermische: number;
    flusskraft: number;
    speicherkraft: number;
    wind: number | null;
    photovoltaik: number | null;
    eigenproduktion: number;
    nettoimporte: number;
    trend: Trend | null;
    trendRating: TrendRating | null;
    trendMovingAverage: number | null;
}

export const map = (records: StromProduktionImportVerbrauchSource[]): StromProduktionImportVerbrauch[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromProduktionImportVerbrauchSource): StromProduktionImportVerbrauch => ({
    datum: record.Datum,
    stromverbrauch: parseFloat(record.Stromverbrauch),
    kernkraft: parseFloat(record.Kernkraft),
    thermische: parseFloat(record.Thermische),
    flusskraft: parseFloat(record.Flusskraft),
    speicherkraft: parseFloat(record.Speicherkraft),
    wind: parseFloatOrNullForNA(record.Wind),
    photovoltaik: parseFloatOrNullForNA(record.Photovoltaik),
    eigenproduktion: parseFloat(record.Eigenproduktion_GWh),
    nettoimporte: parseFloat(record.Nettoimporte),
    trend: Trend[record.Trend],
    trendRating: TrendRating[record.TrendRating],
    trendMovingAverage: parseFloatOrNullForNA(record.MA_Trend),
})
