const assert = require('assert');
const { parseSimpleDiff } = require('../../src/parser');
const { log } = require('../../src/lib/logger');

describe('Empty Addition Validation', () => {
    it('should handle empty addition line', () => {
        const input = 'FILE: test.html\n+ ';
        log('Testing input:', input);

        try {
            parseSimpleDiff(input);
            assert.fail('Should have thrown error for empty addition');
        } catch (error) {
            log('Caught error:', error);
            log('Error message:', error.message);
            log('Error includes "Empty addition":', error.message.includes('Empty addition'));
            assert.ok(error.message.includes('Empty addition'),
                `Expected error message to include "Empty addition" but got: ${error.message}`);
        }
    });
});
