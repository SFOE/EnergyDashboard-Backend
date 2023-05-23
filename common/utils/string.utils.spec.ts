import { describe, expect, it } from '@jest/globals';
import { containsSVGinFilename } from './string.utils';

describe('containsSVGinFilename', () => {
    it('should match svg', () => {
        const result = containsSVGinFilename('test.svg');
        expect(result).toBeTruthy();
    });

    it('should not match other files', () => {
        const result = containsSVGinFilename('test.csv');
        expect(result).toBeFalsy();
    });

    it('should not match svg not as file ending', () => {
        const result = containsSVGinFilename('file_svg_test.csv');
        expect(result).toBeFalsy();
    });
});
