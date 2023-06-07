import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterNiederschlagV2 } from '/opt/nodejs/models/wetter/wetter-niederschlag-v2.model';

export interface WetterNiederschlagApiV2 extends DateModel {
    niederschlagGemessen: number;
}

export const mapToApiModel = (
    records: WetterNiederschlagV2[]
): WetterNiederschlagApiV2[] => {
    return records.map((record) => mapToApi(record));
};

const mapToApi = ({ date, niederschlagGemessen }: WetterNiederschlagV2): WetterNiederschlagApiV2 => ({
    date,
    niederschlagGemessen
});
