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

export interface SparzielZielSourceV5 {
    Datum: string;
    Kumulierte_Monatliche_Einsparung_GWh: string;
    Kumulierte_Einsparung_Prozent: string;
    Kumulierte_Einsparung_witterungsbereinigt_Prozent: string;
    Kumulierte_Monatliche_Einsparung_witterungsbereinigt_GWh: string;
    Schaetzung: string;
    Trend: string;
    TrendRating: string;
}

export interface SparzielZielV5 extends BaseModel, DateModel, TrendModel {
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    kumulierteEinsparungWitterungsbereinigtProzent: number;
    kumulierteEinsparungWitterungsbereinigtGwh: number;
    schaetzung: boolean;
}

export const map = (record: SparzielZielSourceV5): SparzielZielV5 => {
    return {
        id: getUuid(),
        date: record.Datum,
        kumulierteMonatlicheEinsparungGWh: parseIntOrNullForNA(
            record.Kumulierte_Monatliche_Einsparung_GWh
        ),
        kumulierteEinsparungProzent: parseIntOrNullForNA(
            record.Kumulierte_Einsparung_Prozent
        ),
        kumulierteEinsparungWitterungsbereinigtProzent: parseFloatOrNullForNA(
            record.Kumulierte_Einsparung_witterungsbereinigt_Prozent
        ),
        kumulierteEinsparungWitterungsbereinigtGwh: parseFloatOrNullForNA(
            record.Kumulierte_Monatliche_Einsparung_witterungsbereinigt_GWh
        ),
        schaetzung: parseStringToBool(record.Schaetzung),
        trend: Trend[record.Trend],
        trendRating: TrendRating[record.TrendRating]
    };
};
