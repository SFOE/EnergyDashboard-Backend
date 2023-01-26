import { StromVerbrauchEndverbrauchV2 } from '/opt/nodejs/models/strom-verbrauch-endverbrauch-v2.model';

export interface StromVerbrauchEndverbrauchApiV2 {
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

export const mapToApiModel = (records: StromVerbrauchEndverbrauchV2[]): StromVerbrauchEndverbrauchApiV2[] => {
    return records.map(record => mapToApi(record));
};

const mapToApi = ({
    date,
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
}: StromVerbrauchEndverbrauchV2): StromVerbrauchEndverbrauchApiV2 => {
    return {
        endverbrauch,
        fiveYearMin,
        fiveYearMax,
        fiveYearMittelwert,
        date,
        differenzMittelwert,
        differenzMin,
        differenzMax,
        prognoseMittelwert,
        prognoseMin,
        prognoseMax,
    }
}
