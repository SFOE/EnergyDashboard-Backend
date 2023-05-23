import { DateModel } from '/opt/nodejs/models/base/date.model';
import { WetterNiederschlag } from '/opt/nodejs/models/wetter/wetter-niederschlag.model';

export interface WetterNiederschlagApi extends DateModel {
    niederschlagGemessen: number;
}

export const mapToApiModel = (
    records: WetterNiederschlag[]
): WetterNiederschlagApi[] => {
    return records.map((record) => mapToApi(record));
};

const mapToApi = ({ date, niederschlagGemessen }: WetterNiederschlag): WetterNiederschlagApi => ({
    date,
    niederschlagGemessen
});
