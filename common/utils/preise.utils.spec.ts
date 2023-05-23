import { describe, expect, it } from '@jest/globals';
import { filterRelevantPriceEntries } from './preise.utils';

describe('filterRelevantPriceEntries', () => {
    it('should filter entries before cutoff year', () => {
        const entries = [{ date: '2019-12-31' }, { date: '2020-01-01' }];

        const result = filterRelevantPriceEntries(entries);
        expect(result.length).toBe(1);
    });

    it('should handle invalid dates', () => {
        const entries = [
            { date: '201-12-31' },
            { date: 'invalid' },
            { date: '7est' }
        ];

        const result = filterRelevantPriceEntries(entries);
        expect(result.length).toBe(0);
    });
});
