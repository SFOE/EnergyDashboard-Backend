import { StromWinterproduktionTrend } from '/opt/nodejs/models/strom/strom-winterproduktion-trend.model';

export interface StromWinterproduktionTrendApi {
    importe: number | null;
    exporte: number | null;
    nettoimporte: number | null;
}

export const mapToApiModel = ({
    importe,
    exporte,
    nettoimporte
}: StromWinterproduktionTrend): StromWinterproduktionTrendApi => ({
    importe,
    exporte,
    nettoimporte
});
