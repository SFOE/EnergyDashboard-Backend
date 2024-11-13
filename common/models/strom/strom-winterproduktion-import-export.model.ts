import { BaseModel } from '../base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { getUuid } from '/opt/nodejs/utils/id.utils';
import { parseFloatOrNullForNA } from '/opt/nodejs/utils/number.utils';

export interface StromWinterproduktionImportExportSource {
    Datum: string;
    Stromverbrauch_GWh: string;
    Eigenproduktion_GWh: string;
    Nettoimporte_GWh: string;
    Nettoimport_GWh_BFE: string;
    Heizgradtage: string;
}

export interface StromWinterproduktionImportExport
    extends BaseModel,
        DateModel {
    stromverbrauch: number;
    eigenproduktion: number;
    nettoimporte: number;
    nettoimporte_bfe: number;
    heizgradtage: number;
}

export const map = (
    records: StromWinterproduktionImportExportSource[]
): StromWinterproduktionImportExport[] => {
    return records.map((record: StromWinterproduktionImportExportSource) =>
        mapEntry(record)
    );
};

const mapEntry = (
    source: StromWinterproduktionImportExportSource
): StromWinterproduktionImportExport => {
    return {
        id: getUuid(),
        date: source.Datum,
        stromverbrauch: parseFloatOrNullForNA(source.Stromverbrauch_GWh),
        eigenproduktion: parseFloatOrNullForNA(source.Eigenproduktion_GWh),
        nettoimporte: parseFloatOrNullForNA(source.Nettoimporte_GWh),
        nettoimporte_bfe: parseFloatOrNullForNA(source.Nettoimport_GWh_BFE),
        heizgradtage: parseFloatOrNullForNA(source.Heizgradtage)
    };
};
