import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterNiederschlagBilderDaten } from '/opt/nodejs/models/wetter/wetter-niederschlag-bilder-daten.model';

export interface WetterNiederschlagBilderDatenApi extends DateModel {
    thisMonth: number;
    lastMonth: number;
}

export const mapToApiModel = ({
                                  date,
                                  thisMonth,
                                  lastMonth
                              }: WetterNiederschlagBilderDaten): WetterNiederschlagBilderDatenApi => ({
    date,
    thisMonth,
    lastMonth
});
