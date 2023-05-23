import { BaseModel } from './base/base.model';
import { DateModel } from './base/date.model';

export interface StromProduktionsMixSource {
    Datum: string;
    Kumuliert_Kernkraft_TWh: string;
    Kumuliert_Thermische_TWh: string;
    Kumuliert_Flusskraft_TWh: string;
    Kumuliert_Speicherkraft_TWh: string;
    Kumuliert_Wind_TWh: string;
    Kumuliert_Photovoltaik_TWh: string;
    Kumuliert_Eigenproduktion_TWh: string;
    Anteil_Kumuliert_Kernkraft_prozent: string;
    Anteil_Kumuliert_Thermische_prozent: string;
    Anteil_Kumuliert_Flusskraft_prozent: string;
    Anteil_Kumuliert_Speicherkraft_prozent: string;
    Anteil_Kumuliert_Wind_prozent: string;
    Anteil_Kumuliert_Photovoltaik_prozent: string;
}

export interface StromProduktionsMix extends BaseModel, DateModel {
    kumuliertEigenproduktion: number;
    kumuliertKernkraft: number;
    kumuliertThermische: number;
    kumuliertFlusskraft: number;
    kumuliertSpeicherkraft: number;
    kumuliertWind: number;
    kumuliertPhotovoltaik: number;
    anteilKernkraft: number;
    anteilThermische: number;
    anteilFlusskraft: number;
    anteilSpeicherkraft: number;
    anteilWind: number;
    anteilPhotovoltaik: number;
}

export const map = (
    records: StromProduktionsMixSource[]
): StromProduktionsMix[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (record: StromProduktionsMixSource): StromProduktionsMix => ({
    id: createId(record),
    date: record.Datum,
    kumuliertEigenproduktion: parseFloat(record.Kumuliert_Eigenproduktion_TWh),
    kumuliertKernkraft: parseFloat(record.Kumuliert_Kernkraft_TWh),
    kumuliertThermische: parseFloat(record.Kumuliert_Thermische_TWh),
    kumuliertFlusskraft: parseFloat(record.Kumuliert_Flusskraft_TWh),
    kumuliertSpeicherkraft: parseFloat(record.Kumuliert_Speicherkraft_TWh),
    kumuliertWind: parseFloat(record.Kumuliert_Wind_TWh),
    kumuliertPhotovoltaik: parseFloat(record.Kumuliert_Photovoltaik_TWh),
    anteilKernkraft: parseFloat(record.Anteil_Kumuliert_Kernkraft_prozent),
    anteilThermische: parseFloat(record.Anteil_Kumuliert_Thermische_prozent),
    anteilFlusskraft: parseFloat(record.Anteil_Kumuliert_Flusskraft_prozent),
    anteilSpeicherkraft: parseFloat(
        record.Anteil_Kumuliert_Speicherkraft_prozent
    ),
    anteilWind: parseFloat(record.Anteil_Kumuliert_Wind_prozent),
    anteilPhotovoltaik: parseFloat(record.Anteil_Kumuliert_Photovoltaik_prozent)
});

const createId = (record: StromProduktionsMixSource): string => {
    const year = new Date(record.Datum).getFullYear();
    return `strommix-${year}`;
};
