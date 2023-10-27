import { describe, expect, it } from '@jest/globals';
import { isFilenameEndingWith } from './string.utils';

describe('isFilenameEndingWith', () => {
    it('should match svg', () => {
        const result = isFilenameEndingWith('test.svg', ['svg']);
        expect(result).toBeTruthy();
    });

    it('should match any of the endings', () => {
        const result = isFilenameEndingWith('test.png', ['svg', 'png']);
        expect(result).toBeTruthy();
    });

    it('should not match other files', () => {
        const result = isFilenameEndingWith('test.csv', ['svg']);
        expect(result).toBeFalsy();
    });

    it('should not match svg not as file ending', () => {
        const result = isFilenameEndingWith('file_svg_test.csv', ['svg']);
        expect(result).toBeFalsy();
    });
});
