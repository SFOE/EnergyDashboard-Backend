import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromVerbrauchEndverbrauchSource {
    Tag: string;
    Monat: string;
    endverbrauch_GWh_SG: string;
    SG_5y_Min: string;
    SG_5y_Max: string;
    SG_5y_Mittelwert: string;
    Differenz_Mittelwert_prozent: string;
    Differenz_min_prozent: string;
    Differenz_max_prozent: string;
    Prognose_Mittel_GWh: string;
    Prognose_Min_GWh: string;
    Prognose_Max_GWh: string;
}

export interface StromVerbrauchEndverbrauch {
    id: string;
    tag: number;
    monat: number;
    endverbrauch: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
    prognoseMittelwert: number | null;
    prognoseMin: number | null;
    prognoseMax: number | null;
}

export const map = (records: StromVerbrauchEndverbrauchSource[]): StromVerbrauchEndverbrauch[] => {
    return records.map(record => mapRecord(record));
}

const mapRecord = (record: StromVerbrauchEndverbrauchSource): StromVerbrauchEndverbrauch => ({
    id: `${record.Monat}-${record.Tag}`,
    tag: parseInt(record.Tag),
    monat: parseInt(record.Monat),
    endverbrauch: parseFloatOrNullForNA(record.endverbrauch_GWh_SG),
    fiveYearMin: parseFloat(record.SG_5y_Min),
    fiveYearMax: parseFloat(record.SG_5y_Max),
    fiveYearMittelwert: parseFloat(record.SG_5y_Mittelwert),
    differenzMittelwert: parseFloatOrNullForNA(record.Differenz_Mittelwert_prozent),
    differenzMin: parseFloatOrNullForNA(record.Differenz_min_prozent),
    differenzMax: parseFloatOrNullForNA(record.Differenz_max_prozent),
    prognoseMittelwert: parseFloatOrNullForNA(record.Prognose_Mittel_GWh),
    prognoseMin: parseFloatOrNullForNA(record.Prognose_Min_GWh),
    prognoseMax: parseFloatOrNullForNA(record.Prognose_Max_GWh),
})
