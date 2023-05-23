import { BaseModel } from '../base/base.model';
import { DateModel } from '../base/date.model';
import { PreiseGasBoerse } from '/opt/nodejs/models/preise/preise-gas-boerse.model';
import { PreiseGasEndverbrauch } from '/opt/nodejs/models/preise/preise-gas-endverbrauch.model';
import { PreiseHeizoelEntwicklung } from '/opt/nodejs/models/preise/preise-heizoel-entwicklung.model';
import { PreiseStromEndverbrauch } from '/opt/nodejs/models/preise/preise-strom-endverbrauch.model';
import { PreiseTreibstoffBleifrei } from '/opt/nodejs/models/preise/preise-treibstoff-bleifrei.model';
import { PreiseTreibstoffDiesel } from '/opt/nodejs/models/preise/preise-treibstoff-diesel.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseCommonSource {
    Datum: string;
    Preis_LIK_indexiert: string;
}

export interface PreiseCommon extends BaseModel, DateModel {
    preisIndexiert: number;
}

export const mapPreisCommon = (preis: string, date: string): PreiseCommon => ({
    id: getUuid(),
    date: date,
    preisIndexiert: parseFloatOrNullForNA(preis)
});

export type PreiseIndexiertType =
    | PreiseStromEndverbrauch
    | PreiseGasBoerse
    | PreiseGasEndverbrauch
    | PreiseHeizoelEntwicklung
    | PreiseTreibstoffBleifrei
    | PreiseTreibstoffDiesel;

export interface PreiseFuturesSource {
    datum: string;
    monat_plus_1: string;
    monat_plus_2: string;
    quartal_plus_1: string;
    quartal_plus_2: string;
    jahr_plus_1: string;
    jahr_plus_2: string;
}

export interface PreiseFutures extends BaseModel, DateModel {
    monthPlusOne: number;
    monthPlusTwo: number;
    quaterPlusOne: number;
    quaterPlusTwo: number;
    yearPlusOne: number;
    yearPlusTwo: number;
}
