import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface WetterHeizgradtageZeitreiheSource {
    Datum: string;
    'Norm_kumulativ_q2.5%': string;
    Norm_kumulativ_mean: string;
    'Norm_kumulativ_q97.5%': string;
    'Messung_Prognose_kumulativ_q2.5%': string;
    Messung_Prognose_kumulativ_mean: string;
    'Messung_Prognose_kumulativ_q97.5%': string;
    Station: string;
}

export interface WetterHeizgradtageZeitreihe extends BaseModel, DateModel {
    station: string;
    normKumulativMin: number;
    normKumulativMittelwert: number;
    normKumulativMax: number;
    messungPrognoseKumulativMin: number;
    messungPrognoseKumulativMittelwert: number;
    messungPrognoseKumulativMax: number;
}

export const map = (
    records: WetterHeizgradtageZeitreiheSource[]
): WetterHeizgradtageZeitreihe[] => {
    return records.map((record) => mapEntry(record));
};

const mapEntry = (
    source: WetterHeizgradtageZeitreiheSource
): WetterHeizgradtageZeitreihe => {
    return {
        id: getUuid(),
        date: source.Datum,
        station: source.Station,
        normKumulativMin: parseFloat(source['Norm_kumulativ_q2.5%']),
        normKumulativMittelwert: parseFloat(source.Norm_kumulativ_mean),
        normKumulativMax: parseFloat(source['Norm_kumulativ_q97.5%']),
        messungPrognoseKumulativMin: parseFloat(source['Messung_Prognose_kumulativ_q2.5%']),
        messungPrognoseKumulativMittelwert: parseFloat(source.Messung_Prognose_kumulativ_mean),
        messungPrognoseKumulativMax: parseFloat(source['Messung_Prognose_kumulativ_q97.5%'])
    };
};