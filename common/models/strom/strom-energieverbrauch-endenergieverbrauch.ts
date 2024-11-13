import { DateModel } from '../base/date.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

type Energietraeger =
    | 'Elektrizität'
    | 'Erdölprodukte'
    | 'Fernwärme'
    | 'Erdgas'
    | 'Holz'
    | 'Kohle'
    | 'Müll und Industrieabfälle'
    | 'Übrige erneuerbare Energien'
    | 'PtX inkl. Flugverkehr';

export type Perspektive =
    | 'Statistik'
    | 'ZERO_Basis'
    | 'ZERO_A'
    | 'ZERO_B'
    | 'ZERO_C'
    | 'WWB';

export interface StromEnergieverbrauchEndenergieverbrauchSource {
    Jahr: string;
    Energietraeger: Energietraeger;
    Endverbrauch_GWh: string;
    Perspektive: Perspektive;
}

export interface StromEnergieverbrauchEndenergieverbrauch
    extends BaseModel,
        DateModel {
    elektrizitaet: number;
    erdoelprodukte: number;
    fernwaerme: number | null;
    erdgas: number;
    holz: number;
    kohle: number | null;
    abfaelle: number | null;
    uebrigeErneuerbareEnergien: number | null;
    ptx: number | null;
    perspektive: Perspektive;
}

type EnergietraegerMapping = {
    [key in Energietraeger]: keyof StromEnergieverbrauchEndenergieverbrauch;
};

const energietraegerMapping: EnergietraegerMapping = {
    Elektrizität: 'elektrizitaet',
    Erdölprodukte: 'erdoelprodukte',
    Fernwärme: 'fernwaerme',
    Erdgas: 'erdgas',
    Holz: 'holz',
    Kohle: 'kohle',
    'Müll und Industrieabfälle': 'abfaelle',
    'Übrige erneuerbare Energien': 'uebrigeErneuerbareEnergien',
    'PtX inkl. Flugverkehr': 'ptx'
};

export const map = (
    records: StromEnergieverbrauchEndenergieverbrauchSource[]
): StromEnergieverbrauchEndenergieverbrauch[] => {
    const result: { [k: string]: StromEnergieverbrauchEndenergieverbrauch } =
        {};

    records.forEach(
        (record: StromEnergieverbrauchEndenergieverbrauchSource): void => {
            const energietraeger: string =
                energietraegerMapping[record.Energietraeger];
            const verbrauch: number = parseFloatOrNullForNA(
                record.Endverbrauch_GWh
            );

            // initialize year if not done yet
            if (!result[record.Jahr]) {
                result[record.Jahr] = {
                    id: getUuid(),
                    date: record.Jahr,
                    perspektive: record.Perspektive,

                    // predefine to have each technology in each year entry
                    elektrizitaet: null,
                    erdoelprodukte: null,
                    fernwaerme: null,
                    erdgas: null,
                    holz: null,
                    kohle: null,
                    abfaelle: null,
                    uebrigeErneuerbareEnergien: null,
                    ptx: null
                };
            }

            // add actual value for the technology
            result[record.Jahr][energietraeger] = verbrauch;
        }
    );

    // rearrange to array
    return Object.values(result);
};
