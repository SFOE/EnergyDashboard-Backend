import { mapPreisCommon, PreiseCommon } from './preise.common.model';
import { unique } from '/opt/nodejs/utils/array.utils';
import { filterRelevantPriceEntries } from '/opt/nodejs/utils/preise.utils';

export interface PreiseGasDayaheadSource {
    Datum: string;
    ttf_day_ahead_EUR_MWh: string;
}

export interface PreiseGasDayahead extends PreiseCommon {}

export const map = (
    records: PreiseGasDayaheadSource[]
): PreiseGasDayahead[] => {
    const mappedRecords = filterRelevantPriceEntries(
        records.map((record) => mapRecord(record))
    );
    return unique(mappedRecords.reverse(), 'date'); // reverse to take latest entry for unique value
};

const mapRecord = (record: PreiseGasDayaheadSource): PreiseGasDayahead =>
    mapPreisCommon(record.ttf_day_ahead_EUR_MWh, record.Datum);
