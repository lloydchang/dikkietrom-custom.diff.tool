const validateFilePath = require('../src/core/validation/validateFilePath');

describe('validateFilePath', () => {
    test('should throw error for empty filepath', () => {
        expect(() => validateFilePath('')).toThrow('Empty filepath');
        expect(() => validateFilePath(null)).toThrow('Empty filepath');
        expect(() => validateFilePath(undefined)).toThrow('Empty filepath');
    });

    test('should throw error for filepath with newlines', () => {
        expect(() => validateFilePath('path\nwith\nnewlines')).toThrow('Filepath cannot contain newlines');
    });

    test('should throw error for absolute paths', () => {
        expect(() => validateFilePath('/absolute/path')).toThrow('Filepath must be relative');
    });

    test('should accept valid relative paths', () => {
        expect(() => validateFilePath('relative/path.js')).not.toThrow();
        expect(() => validateFilePath('file.txt')).not.toThrow();
        expect(() => validateFilePath('./path/file.css')).not.toThrow();
    });
});
