import { describe, expect, it } from '@jest/globals';
import { StromSparziel5ProzentPeakH } from '../../models/strom/strom-sparziel-5-prozent-peak-h.model';
import { mapToApiModel, StromSparziel5ProzentPeakHApiModel } from './strom-sparziel-5-prozent-peak-h.api-model';

describe('mapStromSparziel5ProzentPeakHToApiModel', () => {
    it('should return an empty array when the input is an empty array', () => {
        const input: StromSparziel5ProzentPeakH[] = [];
        const expectedOutput: StromSparziel5ProzentPeakHApiModel[] = [];

        const actualOutput = mapToApiModel(input);

        expect(actualOutput).toEqual(expectedOutput);
    });

    it('should group input objects by year and month', () => {
        const input: StromSparziel5ProzentPeakH[] = [
            {
                id: '1',
                year: 2022,
                month: 1,
                weekday: 1,
                hour: 1,
                savedPercent: 10,
                anteilPrivate: 5,
                anteilIndustrie: 10,
                anteilKMU: 20
            },
            {
                id: '2',
                year: 2022,
                month: 1,
                weekday: 1,
                hour: 2,
                savedPercent: 20,
                anteilPrivate: 5,
                anteilIndustrie: 10,
                anteilKMU: 20
            },
            {
                id: '1',
                year: 2022,
                month: 1,
                weekday: 2,
                hour: 1,
                savedPercent: 50,
                anteilPrivate: 5,
                anteilIndustrie: 10,
                anteilKMU: 20
            },
            {
                id: '2',
                year: 2022,
                month: 1,
                weekday: 2,
                hour: 2,
                savedPercent: 60,
                anteilPrivate: 5,
                anteilIndustrie: 10,
                anteilKMU: 20
            },
            {
                id: '3',
                year: 2022,
                month: 2,
                weekday: 1,
                hour: 1,
                savedPercent: 30,
                anteilPrivate: 5,
                anteilIndustrie: 10,
                anteilKMU: 20
            },
            {
                id: '4',
                year: 2022,
                month: 2,
                weekday: 1,
                hour: 2,
                savedPercent: 40,
                anteilPrivate: 5,
                anteilIndustrie: 10,
                anteilKMU: 20
            }
        ];
        const expectedOutput: StromSparziel5ProzentPeakHApiModel[] = [
            {
                year: 2022,
                month: 1,
                peakDays: [
                    { weekday: 1, hour: 1, savedPercent: 10, anteilPrivate: 5, anteilIndustrie: 10, anteilKMU: 20 },
                    { weekday: 1, hour: 2, savedPercent: 20, anteilPrivate: 5, anteilIndustrie: 10, anteilKMU: 20 },
                    { weekday: 2, hour: 1, savedPercent: 50, anteilPrivate: 5, anteilIndustrie: 10, anteilKMU: 20 },
                    { weekday: 2, hour: 2, savedPercent: 60, anteilPrivate: 5, anteilIndustrie: 10, anteilKMU: 20 }
                ]
            },
            {
                year: 2022,
                month: 2,
                peakDays: [
                    { weekday: 1, hour: 1, savedPercent: 30, anteilPrivate: 5, anteilIndustrie: 10, anteilKMU: 20 },
                    { weekday: 1, hour: 2, savedPercent: 40, anteilPrivate: 5, anteilIndustrie: 10, anteilKMU: 20 }
                ]
            }
        ];

        const actualOutput = mapToApiModel(input);

        expect(actualOutput).toEqual(expectedOutput);
    });
});