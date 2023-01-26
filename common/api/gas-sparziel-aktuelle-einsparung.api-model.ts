import { GasSparzielAktuelleEinsparung } from '/opt/nodejs/models/gas-sparziel-aktuelle-einsparung.model';
import { mapDateYearAndMonth } from '/opt/nodejs/utils/date.utils';

export interface GasSparzielAktuelleEinsparungApi {
    date: string;
    differenzMittelwertProzent: number;
    temperatur: number;
}

export const mapToApiModel = (records: GasSparzielAktuelleEinsparung[]): GasSparzielAktuelleEinsparungApi[] => {
    return records.map(record => mapToApi(record));
};

export const mapToApi = (record: GasSparzielAktuelleEinsparung): GasSparzielAktuelleEinsparungApi => ({
    date: mapDateYearAndMonth(record.jahr, record.monat),
    differenzMittelwertProzent: record.differenzMittelwertProzent || 0,
    temperatur: record.temperatur,
})
