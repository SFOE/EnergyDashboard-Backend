import { describe, expect, test } from '@jest/globals';
import { AmpelEntry } from '../../../common/models/ampel.model';
import { findCurrentlyValidEntry } from './get-ampel';

describe('findCurrentlyValidEntry', () => {
    test('finds the correct entry for historical entries', () => {
        const source: AmpelEntry[] = [{
            level: 1,
            validFrom: '2022-01-01',
        }, {
            level: 2,
            validFrom: '2022-05-01',
        }]
        const date = new Date('2022-06-01');

        const expected = findCurrentlyValidEntry(source, date.getTime());
        expect(expected.level).toEqual(2);
        expect(expected.validFrom).toEqual('2022-05-01');
    });

    test('finds the correct entry including future entries', () => {
        const source: AmpelEntry[] = [{
            level: 1,
            validFrom: '2022-01-01',
        }, {
            level: 2,
            validFrom: '2022-05-01',
        }, {
            level: 3,
            validFrom: '2022-10-01',
        }];

        const date = new Date('2022-06-01');
        const expected = findCurrentlyValidEntry(source, date.getTime());
        expect(expected.level).toEqual(2);
        expect(expected.validFrom).toEqual('2022-05-01');
    });

    test('finds the correct entry including multiple future entries', () => {
        const source: AmpelEntry[] = [{
            level: 1,
            validFrom: '2022-01-01',
        }, {
            level: 2,
            validFrom: '2022-05-01',
        }, {
            level: 3,
            validFrom: '2022-10-01',
        }];

        const date = new Date('2022-04-01');
        const expected = findCurrentlyValidEntry(source, date.getTime());
        expect(expected.level).toEqual(1);
        expect(expected.validFrom).toEqual('2022-01-01');
    });

    test('finds the correct entry in an unsorted array', () => {
        const source: AmpelEntry[] = [{
            level: 3,
            validFrom: '2022-10-01',
        }, {
            level: 2,
            validFrom: '2022-05-01',
        }, {
            level: 1,
            validFrom: '2022-01-01',
        }];

        const date = new Date('2022-06-01');
        const expected = findCurrentlyValidEntry(source, date.getTime());
        expect(expected.level).toEqual(2);
        expect(expected.validFrom).toEqual('2022-05-01');
    });
});
