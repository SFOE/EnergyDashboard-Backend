import { StromVerbrauchEndverbrauch } from '/opt/nodejs/models/strom-verbrauch-endverbrauch.model';
import { mapDateMonthAndDay } from '../utils/date.utils';

export interface StromVerbrauchEndverbrauchApi {
    endverbrauch: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
    prognoseMittelwert: number | null;
    prognoseMin: number | null;
    prognoseMax: number | null;
}

export const mapToApiModel = (records: StromVerbrauchEndverbrauch[]): StromVerbrauchEndverbrauchApi[] => {
    return records.map(record => mapToApi(record));
};

const mapToApi = ({
    monat,
    tag,
    endverbrauch,
    fiveYearMin,
    fiveYearMax,
    fiveYearMittelwert,
    differenzMittelwert,
    differenzMin,
    differenzMax,
    prognoseMittelwert,
    prognoseMin,
    prognoseMax,
}: StromVerbrauchEndverbrauch): StromVerbrauchEndverbrauchApi => {
    return {
        endverbrauch,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date: mapDateMonthAndDay(monat, tag),
        differenzMittelwert,
        differenzMin,
        differenzMax,
        prognoseMittelwert,
        prognoseMin,
        prognoseMax,
    }
}
