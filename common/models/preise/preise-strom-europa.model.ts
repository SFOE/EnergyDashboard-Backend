import { getUuid } from '../../utils/id.utils';
import { BaseModel } from '../base/base.model';
import { DateModel } from '../base/date.model';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface PreiseStromEuropaSource {
    bidding_zone: string;
    Preis_EUR_MWh_mean: string;
}

export interface PreiseStromEuropa extends BaseModel, DateModel {
    biddingZone: string;
    preisEurMwhMean: number;
}

export const map = (
    records: PreiseStromEuropaSource[]
): PreiseStromEuropa[] => {
    return records.map((record) => mapRecord(record));
};

const mapRecord = (record: PreiseStromEuropaSource): PreiseStromEuropa => {
    return {
        id: getUuid(),
        date: new Date().toISOString(),
        biddingZone: record.bidding_zone,
        preisEurMwhMean: parseFloatOrNullForNA(record.Preis_EUR_MWh_mean)
    };
};
