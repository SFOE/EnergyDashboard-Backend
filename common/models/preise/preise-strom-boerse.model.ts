import { BaseModel } from '../base/base.model';
import { DateModel } from '../base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseStromBoerseSource {
    Datum: string;
    Baseload_EUR_MWh: string;
}

export interface PreiseStromBoerse extends BaseModel, DateModel {
    preisEUR: number;
}

export const map = (
    records: PreiseStromBoerseSource[]
): PreiseStromBoerse[] => {
    return filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
};

const mapRecord = (record: PreiseStromBoerseSource): PreiseStromBoerse => ({
    id: getUuid(),
    date: record.Datum,
    preisEUR: parseFloatOrNullForNA(record.Baseload_EUR_MWh)
});
