import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromWinterproduktionEinzelneEnergietraegerSource {
    Datum: string;
    Kernkraft: string;
    Thermische: string;
    Flusskraft: string;
    Speicherkraft: string;
    Wind: string;
    Photovoltaik: string;
}

export interface StromWinterproduktionEinzelneEnergietraeger
    extends BaseModel,
        DateModel {
    kernkraft: number;
    thermische: number;
    flusskraft: number;
    speicherkraft: number;
    wind: number;
    pv: number;
}

export const map = (
    records: StromWinterproduktionEinzelneEnergietraegerSource[]
): StromWinterproduktionEinzelneEnergietraeger[] => {
    return records.map(
        (record: StromWinterproduktionEinzelneEnergietraegerSource) =>
            mapEntry(record)
    );
};

const mapEntry = (
    source: StromWinterproduktionEinzelneEnergietraegerSource
): StromWinterproduktionEinzelneEnergietraeger => {
    return {
        id: getUuid(),
        date: source.Datum,
        kernkraft: parseFloatOrNullForNA(source.Kernkraft),
        thermische: parseFloatOrNullForNA(source.Thermische),
        flusskraft: parseFloatOrNullForNA(source.Flusskraft),
        speicherkraft: parseFloatOrNullForNA(source.Speicherkraft),
        wind: parseFloatOrNullForNA(source.Wind),
        pv: parseFloatOrNullForNA(source.Photovoltaik)
    };
};
