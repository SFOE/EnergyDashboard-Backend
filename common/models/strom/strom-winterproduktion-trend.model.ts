import { BaseModel } from '../base/base.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

type WinterproduktionTrendTypes = 'Importe' | 'Exporte' | 'Nettoimporte';

type TypeMapping = {
    [key in WinterproduktionTrendTypes]: keyof StromWinterproduktionTrend;
};

const winterproduktionTrendTypeMapping: TypeMapping = {
    Importe: 'importe',
    Exporte: 'exporte',
    Nettoimporte: 'nettoimporte'
};

export interface StromWinterproduktionTrendSource {
    Type: string;
    Summe_GWh: string;
}

export interface StromWinterproduktionTrend extends BaseModel {
    importe: number | null;
    exporte: number | null;
    nettoimporte: number | null;
}

export const map = (
    records: StromWinterproduktionTrendSource[]
): StromWinterproduktionTrend[] => {
    const result: StromWinterproduktionTrend = {
        id: getUuid(),
        importe: null,
        exporte: null,
        nettoimporte: null
    };

    records.forEach((record: StromWinterproduktionTrendSource) => {
        const winterproduktionType: string =
            winterproduktionTrendTypeMapping[record.Type];

        if (result[winterproduktionType] === null) {
            result[winterproduktionType] = parseFloatOrNullForNA(
                record.Summe_GWh
            );
        }
    });

    // rearrange to array
    return [result];
};
