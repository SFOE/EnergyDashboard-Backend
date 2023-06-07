import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromSparzielEinsparungAktuellerMonatKundengruppeSource {
    Datum: string;
    share_unter_20_MWh: string;
    share_20_100_MWh: string;
    share_ueber_100_MWh: string;
    national_savings_percent: string;
    national_savings_MWh: string;
}

export interface StromSparzielEinsparungAktuellerMonatKundengruppe extends BaseModel, DateModel {
    anteilPrivate: number | null;
    anteilKMU: number | null;
    anteilIndustrie: number | null;
    nationalSavingsPercent: number | null;
    nationalSavingsMWh: number | null;
}

export const map = (
    records: StromSparzielEinsparungAktuellerMonatKundengruppeSource[]
): StromSparzielEinsparungAktuellerMonatKundengruppe[] => {
    return records.map((record) => mapRecord(record));
};

export const mapRecord = (
    record: StromSparzielEinsparungAktuellerMonatKundengruppeSource
): StromSparzielEinsparungAktuellerMonatKundengruppe => ({
    id: getUuid(),
    date: record.Datum,
    anteilPrivate: parseFloatOrNullForNA(record.share_unter_20_MWh),
    anteilKMU: parseFloatOrNullForNA(record.share_20_100_MWh),
    anteilIndustrie: parseFloatOrNullForNA(record.share_ueber_100_MWh),
    nationalSavingsPercent: parseFloatOrNullForNA(record.national_savings_percent),
    nationalSavingsMWh: parseFloatOrNullForNA(record.national_savings_MWh)
});
