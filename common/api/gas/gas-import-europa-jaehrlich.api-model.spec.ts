import { describe, expect, it } from '@jest/globals';
import {
    GasImportEuropaJaehrlichApi,
    GasImportEuropaJaehrlichEntryApi,
    mapToApi,
    mapToApiModel
} from './gas-import-europa-jaehrlich.api-model';
import { GasImportEuropaJaehrlich } from '../../models/gas/gas-import-europa-jaehrlich.model';

describe('GasImportEuropaJaehrlich API Model', () => {
    describe('mapToApi', () => {
        it('should correctly map a record to an API entry', () => {
            const record: GasImportEuropaJaehrlich = {
                id: '1',
                jahr: 2023,
                land: 'Germany',
                millM3: 100,
                prozent: 20,
                stand: '2023-01-01'
            };

            const expected: GasImportEuropaJaehrlichEntryApi = {
                millM3: 100,
                prozent: 20,
                stand: '2023-01-01'
            };

            expect(mapToApi(record)).toEqual(expected);
        });
    });

    describe('mapToApiModel', () => {
        it('should correctly map an array of records to an API model', () => {
            const records: GasImportEuropaJaehrlich[] = [
                {
                    id: '1',
                    jahr: 2023,
                    land: 'Germany',
                    millM3: 100,
                    prozent: 20,
                    stand: '2023-01-01'
                },
                {
                    id: '2',
                    jahr: 2023,
                    land: 'France',
                    millM3: 80,
                    prozent: 16,
                    stand: '2023-01-01'
                },
                {
                    id: '3',
                    jahr: 2022,
                    land: 'France',
                    millM3: 90,
                    prozent: 6,
                    stand: '2023-01-01'
                },
                {
                    id: '4',
                    jahr: 2022,
                    land: 'Germany',
                    millM3: 10,
                    prozent: 50,
                    stand: '2023-01-01'
                }
            ];

            const expected: GasImportEuropaJaehrlichApi = {
                2023: {
                    Germany: {
                        millM3: 100,
                        prozent: 20,
                        stand: '2023-01-01'
                    },
                    France: {
                        millM3: 80,
                        prozent: 16,
                        stand: '2023-01-01'
                    }
                },
                2022: {
                    Germany: {
                        millM3: 10,
                        prozent: 50,
                        stand: '2023-01-01'
                    },
                    France: {
                        millM3: 90,
                        prozent: 6,
                        stand: '2023-01-01'
                    }
                }
            };

            expect(mapToApiModel(records)).toEqual(expected);
        });
    });
});
