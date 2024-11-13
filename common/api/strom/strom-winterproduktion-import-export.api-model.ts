import { DateModel } from '/opt/nodejs/models/base/date.model';
import { StromWinterproduktionImportExport } from '/opt/nodejs/models/strom/strom-winterproduktion-import-export.model';

export interface StromWinterproduktionImportExportApi extends DateModel {
    stromverbrauch: number;
    eigenproduktion: number;
    nettoimporte: number;
    nettoimporte_bfe: number;
    heizgradtage: number;
}

export const mapToApiModel = (
    records: StromWinterproduktionImportExport[]
): StromWinterproduktionImportExportApi[] => {
    return records.map((record: StromWinterproduktionImportExport) =>
        mapToApi(record)
    );
};

const mapToApi = ({
    date,
    stromverbrauch,
    eigenproduktion,
    nettoimporte,
    nettoimporte_bfe,
    heizgradtage
}: StromWinterproduktionImportExport): StromWinterproduktionImportExportApi => ({
    date,
    stromverbrauch,
    eigenproduktion,
    nettoimporte,
    nettoimporte_bfe,
    heizgradtage
});
