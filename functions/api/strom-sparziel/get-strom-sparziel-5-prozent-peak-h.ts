import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAllStromSparziel5ProzentPeakH } from '/opt/nodejs/db/strom-sparziel-5-prozent-peak-h.db';
import {
    mapToApiModel,
    StromSparziel5ProzentPeakDayApiModel,
    StromSparziel5ProzentPeakHApiModel
} from '/opt/nodejs/api/strom-sparziel-5-prozent-peak-h.api-model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const data = await fetchAllStromSparziel5ProzentPeakH();
    const mappedData = mapToApiModel(data);
    sort(mappedData);
    return createResponse(mappedData);
};

const sort = (data: StromSparziel5ProzentPeakHApiModel[]) => {
    data.sort(sortFn);

    data.forEach((entry) => {
        entry.peakDays.sort(daySortFn);
    });
};

const sortFn = (a: StromSparziel5ProzentPeakHApiModel, b: StromSparziel5ProzentPeakHApiModel) => {
    return a.year - b.year || a.month - b.month;

};
const daySortFn = (a: StromSparziel5ProzentPeakDayApiModel, b: StromSparziel5ProzentPeakDayApiModel) => {
    return a.weekday - b.weekday || a.hour - b.hour;
};
