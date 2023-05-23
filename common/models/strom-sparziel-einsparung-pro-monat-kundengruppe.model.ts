import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { mapDateYearAndMonth } from '/opt/nodejs/utils/date.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromSparzielEinsparungProMonatKundengruppeSource {
    year: string;
    month: string;
    share_unter_20_MWh: string;
    share_20_100_MWh: string;
    share_ueber_100_MWh: string;
    national_savings_percent: string;
}

export interface StromSparzielEinsparungProMonatKundengruppe extends BaseModel, DateModel {
    anteilPrivate: number | null;
    anteilKMU: number | null;
    anteilIndustrie: number | null;
    nationalSavingsPercent: number | null;
}

export const map = (
    records: StromSparzielEinsparungProMonatKundengruppeSource[]
): StromSparzielEinsparungProMonatKundengruppe[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: StromSparzielEinsparungProMonatKundengruppeSource
): StromSparzielEinsparungProMonatKundengruppe => ({
    id: getUuid(),
    date: mapDateYearAndMonth(parseInt(record.year), parseInt(record.month)),
    anteilPrivate: parseFloatOrNullForNA(record.share_unter_20_MWh),
    anteilKMU: parseFloatOrNullForNA(record.share_20_100_MWh),
    anteilIndustrie: parseFloatOrNullForNA(record.share_ueber_100_MWh),
    nationalSavingsPercent: parseFloatOrNullForNA(record.national_savings_percent)
});
