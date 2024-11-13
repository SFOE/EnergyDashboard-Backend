import { EntkoppelungEndenergieverbrauchBIP } from '../../models/strom/strom-entkoppelung-endenergieverbrauch-bip.model';

export type EntkoppelungEndenergieverbrauchBIPApiModel =
    EntkoppelungEndenergieverbrauchBIP;

export const mapToApiModel = (
    records: EntkoppelungEndenergieverbrauchBIP[]
): EntkoppelungEndenergieverbrauchBIPApiModel[] =>
    records.map((record) => mapToApi(record));

export const mapToApi = (
    record: EntkoppelungEndenergieverbrauchBIP
): EntkoppelungEndenergieverbrauchBIPApiModel => record;
