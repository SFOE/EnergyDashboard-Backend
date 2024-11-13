import { DateModel } from '../base/date.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

type Energietraeger =
    | 'Holzenergie'
    | 'Wasserkraft'
    | 'Müll und Industrieabfälle'
    | 'Kohle'
    | 'Rohöl und Erdölprodukte'
    | 'Erdgas'
    | 'Kernbrennstoffe'
    | 'Übrige erneuerbare Energien'
    | 'PtX inkl. Flugverkehr';

export type Perspektive =
    | 'Statistik'
    | 'ZERO_Basis'
    | 'ZERO_A'
    | 'ZERO_B'
    | 'ZERO_C'
    | 'WWB';

export interface StromEnergieverbrauchBruttoenergieverbrauchSource {
    Jahr: string;
    Energietraeger: Energietraeger;
    Bruttoverbrauch_GWh: string;
    Perspektive: Perspektive;
}

export interface StromEnergieverbrauchBruttoenergieverbrauch
    extends BaseModel,
        DateModel {
    holz: number;
    wasser: number;
    abfaelle: number | null;
    kohle: number;
    erdoel: number;
    erdgas: number | null;
    nuclear: number | null;
    uebrigeErneuerbareEnergien: number | null;
    ptx: number | null;
    perspektive: Perspektive;
}

type EnergietraegerMapping = {
    [key in Energietraeger]: keyof StromEnergieverbrauchBruttoenergieverbrauch;
};

const energietraegerMapping: EnergietraegerMapping = {
    Holzenergie: 'holz',
    Wasserkraft: 'wasser',
    'Müll und Industrieabfälle': 'abfaelle',
    Kohle: 'kohle',
    'Rohöl und Erdölprodukte': 'erdoel',
    Erdgas: 'erdgas',
    Kernbrennstoffe: 'nuclear',
    'Übrige erneuerbare Energien': 'uebrigeErneuerbareEnergien',
    'PtX inkl. Flugverkehr': 'ptx'
};

export const map = (
    records: StromEnergieverbrauchBruttoenergieverbrauchSource[]
): StromEnergieverbrauchBruttoenergieverbrauch[] => {
    const result: { [k: string]: StromEnergieverbrauchBruttoenergieverbrauch } =
        {};

    records.forEach(
        (record: StromEnergieverbrauchBruttoenergieverbrauchSource) => {
            const energietraeger: string =
                energietraegerMapping[record.Energietraeger];
            const verbrauch = parseFloatOrNullForNA(record.Bruttoverbrauch_GWh);

            // initialize year if not done yet
            if (!result[record.Jahr]) {
                result[record.Jahr] = {
                    id: getUuid(),
                    date: record.Jahr,
                    perspektive: record.Perspektive,

                    // predefine to have each technology in each year entry
                    holz: null,
                    wasser: null,
                    abfaelle: null,
                    kohle: null,
                    erdoel: null,
                    erdgas: null,
                    nuclear: null,
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
