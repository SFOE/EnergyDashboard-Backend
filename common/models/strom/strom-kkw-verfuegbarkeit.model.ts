import { BaseModel } from '/opt/nodejs/models/base/base.model';
import { DateModel } from '/opt/nodejs/models/base/date.model';
import { parseIntOrNullForNA } from '/opt/nodejs/utils/number.utils';
import { getUuid } from '/opt/nodejs/utils/id.utils';

export interface StromKkwVerfuegbarkeitSource {
    land: string;
    datum: string;
    geplanter_ausfall_mittelwert: string;
    ungeplanter_ausfall_mittelwert: string;
    kkw_installierte_leistung: string;
    kkw_verfugbare_leistung: string;
}

export interface StromKkwVerfuegbarkeit extends BaseModel, DateModel {
    country: string;
    geplanterAusfallMittelwert: number | null;
    ungeplanterAusfallMittelwert: number | null;
    kkwInstallierteLeistung: number;
    kkwVerfuegbareLeistung: number;
}

export const mapRecords = (
    records: StromKkwVerfuegbarkeitSource[]
): StromKkwVerfuegbarkeit[] =>
    records.map(
        (record) =>
            ({
                id: getUuid(),
                date: record.datum,
                country: record.land.toLowerCase(),
                geplanterAusfallMittelwert: parseIntOrNullForNA(record.geplanter_ausfall_mittelwert),
                ungeplanterAusfallMittelwert: parseIntOrNullForNA(record.ungeplanter_ausfall_mittelwert),
                kkwInstallierteLeistung: parseInt(record.kkw_installierte_leistung),
                kkwVerfuegbareLeistung: parseInt(record.kkw_verfugbare_leistung)
            })
    );
