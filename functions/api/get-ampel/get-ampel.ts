import { map } from '/opt/nodejs/api/ampel.api-model';
import { createResponse } from '/opt/nodejs/api/api-requests';
import { fetchAmpel } from '/opt/nodejs/db/ampel.db';
import { AmpelEntry } from '/opt/nodejs/models/ampel.model';

export const handler = async (event): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const ampel = await fetchAmpel();
    console.log(`ampel: ${JSON.stringify(ampel)}`);
    const currentDateAsTime = new Date().getTime();
    const strom = findCurrentlyValidEntry(ampel.ampelStatusStrom, currentDateAsTime);
    const gas = findCurrentlyValidEntry(ampel.ampelStatusGas, currentDateAsTime);

    const data = map(strom, gas);
    console.log(`data: ${JSON.stringify(data)}`);

    return createResponse(data);
};

export const findCurrentlyValidEntry = (entries: AmpelEntry[], currentDate: number) => {

    return entries.sort(sortFn)
        .slice().reverse()
        .find(entry => new Date(entry.validFrom).getTime() < currentDate);
}


const sortFn = (a: AmpelEntry, b: AmpelEntry) => {
    return new Date(a.validFrom).getTime() - new Date(b.validFrom).getTime();
}


