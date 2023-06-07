import { AmpelEntry } from '/opt/nodejs/models/dashboard/ampel.model';

export interface AmpelApi {
    ampelStatusStrom: AmpelEntryApi;
    ampelStatusGas: AmpelEntryApi;
}

export interface AmpelEntryApi {
    level: number;
    validFrom: Date;
}

export const map = (strom: AmpelEntry, gas: AmpelEntry): AmpelApi => ({
    ampelStatusStrom: mapEntry(strom),
    ampelStatusGas: mapEntry(gas)
});

const mapEntry = (entry: AmpelEntry): AmpelEntryApi => ({
    level: entry.level,
    validFrom: new Date(entry.validFrom)
});

