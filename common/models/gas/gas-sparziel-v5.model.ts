import {
    parseFloatOrNullForNA,
    parseIntOrNullForNA
} from '../../utils/number.utils';
import { parseStringToBool } from '../../utils/string.utils';
import { Trend, TrendRating } from '../base/trend.enum';
import { TrendModel } from '../base/trend.model';
import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface GasSparzielSourceV5 {
    Datum: string;
    Kumulierte_Monatliche_Einsparung_GWh: string;
    Kumulierte_Einsparung_Prozent: string;
    Schaetzung: string;
    Trend: string;
    TrendRating: string;
}

export interface GasSparzielV5 extends BaseModel, DateModel, TrendModel {
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    schaetzung: boolean;
}

export const map = (record: GasSparzielSourceV5): GasSparzielV5 => {
    return {
        id: getUuid(),
        date: record.Datum,
        kumulierteMonatlicheEinsparungGWh: parseIntOrNullForNA(
            record.Kumulierte_Monatliche_Einsparung_GWh
        ),
        kumulierteEinsparungProzent: parseIntOrNullForNA(
            record.Kumulierte_Einsparung_Prozent
        ),
        schaetzung: parseStringToBool(record.Schaetzung),
        trend: Trend[record.Trend],
        trendRating: TrendRating[record.TrendRating]
    };
};
