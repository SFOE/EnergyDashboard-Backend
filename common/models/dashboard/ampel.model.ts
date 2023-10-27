export interface AmpelSource {
    ampel_status_strom: AmpelEntrySource[];
    ampel_status_gas: AmpelEntrySource[];
}

export interface AmpelEntrySource {
    level: number;
    valid_from: string;
}

export interface Ampel {
    id: 'ampel';
    ampelStatusStrom: AmpelEntry[];
    ampelStatusGas: AmpelEntry[];
}

export interface AmpelEntry {
    level: number;
    validFrom: string;
}

export const map = (source: AmpelSource): Ampel => {
    return {
        id: 'ampel',
        ampelStatusStrom: source.ampel_status_strom.map((entry) =>
            mapEntry(entry)
        ),
        ampelStatusGas: source.ampel_status_gas.map((entry) => mapEntry(entry))
    };
};

const mapEntry = (source: AmpelEntrySource): AmpelEntry => {
    return {
        level: source.level,
        validFrom: source.valid_from
    };
};
