import { DateModel } from '/opt/nodejs/models/base/date.model';
import { StromWinterproduktionEinzelneEnergietraeger } from '/opt/nodejs/models/strom/strom-winterproduktion-einzelne-energietraeger.model';

export interface StromWinterproduktionEinzelneEnergietraegerApi
    extends DateModel {
    kernkraft: number;
    thermische: number;
    flusskraft: number;
    speicherkraft: number;
    wind: number;
    pv: number;
}

export const mapToApiModel = (
    records: StromWinterproduktionEinzelneEnergietraeger[]
): StromWinterproduktionEinzelneEnergietraegerApi[] => {
    return records.map((record: StromWinterproduktionEinzelneEnergietraeger) =>
        mapToApi(record)
    );
};

const mapToApi = ({
    date,
    kernkraft,
    thermische,
    flusskraft,
    speicherkraft,
    wind,
    pv
}: StromWinterproduktionEinzelneEnergietraeger): StromWinterproduktionEinzelneEnergietraegerApi => ({
    date,
    kernkraft,
    thermische,
    flusskraft,
    speicherkraft,
    wind,
    pv
});
