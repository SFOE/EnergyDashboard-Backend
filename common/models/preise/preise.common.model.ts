import { PreiseGasBoerse } from '/opt/nodejs/models/preise/preise-gas-boerse.model';
import { PreiseGasEndverbrauch } from '/opt/nodejs/models/preise/preise-gas-endverbrauch.model';
import { PreiseHeizoelEntwicklung } from '/opt/nodejs/models/preise/preise-heizoel-entwicklung.model';
import { PreiseStromEndverbrauch } from '/opt/nodejs/models/preise/preise-strom-endverbrauch.model';
import { PreiseTreibstoffBleifrei } from '/opt/nodejs/models/preise/preise-treibstoff-bleifrei.model';
import { PreiseTreibstoffDiesel } from '/opt/nodejs/models/preise/preise-treibstoff-diesel.model';

export interface PreiseCommonSource {
    Datum: string;
    Preis_LIK_indexiert: string;
}

export interface PreiseCommon {
    date: string;
    preisIndexiert: number;
}

export type PreiseIndexiertType =
    | PreiseStromEndverbrauch
    | PreiseGasBoerse
    | PreiseGasEndverbrauch
    | PreiseHeizoelEntwicklung
    | PreiseTreibstoffBleifrei
    | PreiseTreibstoffDiesel;
