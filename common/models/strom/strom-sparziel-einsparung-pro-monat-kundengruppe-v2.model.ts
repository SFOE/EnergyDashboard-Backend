import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromSparzielEinsparungProMonatKundengruppeSourceV2 {
    Datum: string;
    share_unter_20_MWh: string;
    share_20_100_MWh: string;
    share_ueber_100_MWh: string;
    national_savings_percent: string;
}

export interface StromSparzielEinsparungProMonatKundengruppeV2 extends BaseModel, DateModel {
    anteilPrivate: number | null;
    anteilKMU: number | null;
    anteilIndustrie: number | null;
    nationalSavingsPercent: number | null;
}

export const map = (
    records: StromSparzielEinsparungProMonatKundengruppeSourceV2[]
): StromSparzielEinsparungProMonatKundengruppeV2[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: StromSparzielEinsparungProMonatKundengruppeSourceV2
): StromSparzielEinsparungProMonatKundengruppeV2 => ({
    id: getUuid(),
    date: record.Datum,
    anteilPrivate: parseFloatOrNullForNA(record.share_unter_20_MWh),
    anteilKMU: parseFloatOrNullForNA(record.share_20_100_MWh),
    anteilIndustrie: parseFloatOrNullForNA(record.share_ueber_100_MWh),
    nationalSavingsPercent: parseFloatOrNullForNA(record.national_savings_percent)
});
