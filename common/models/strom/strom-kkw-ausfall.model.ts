import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { parseStringToBool } from '/opt/nodejs/utils/string.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromKkwAusfallSourceV1 {
    Country: string;
    Production_Plant: string;
    Start_Date: string;
    End_Date: string;
    Planned: string;
    Nominal_MW: string;
    Available_MW: string;
}

export interface StromKkwAusfallV1 extends BaseModel {
    productionPlant: string;
    startDate: string;
    endDate: string;
    wasPlanned: boolean;
    country: string;
}

export const mapRecords = (
    records: StromKkwAusfallSourceV1[]
): StromKkwAusfallV1[] =>
    records.map(
        (record) =>
            <StromKkwAusfallV1>{
                id: getUuid(),
                productionPlant: mapKkwName(record.Production_Plant),
                startDate: record.Start_Date,
                endDate: record.End_Date,
                wasPlanned: parseStringToBool(record.Planned),
                country: record.Country.toLowerCase()
            }
    );

const mapKkwName = (sourceString: string): string => {
    const normalizedSourceString = sourceString
        .toLowerCase()
        .replace(/\s/g, '');
    switch (normalizedSourceString) {
        case 'kkl-kernkwleibstadtag':
            return 'leibstadt';
        case 'kkb-kernkwbeznau':
            return 'beznau';
        case 'kernkraftwerkgösgen':
            return 'goesgen';
        default: // for french kkw
            return normalizedSourceString;
    }
};
