const assert = require('assert');
const { parseSimpleDiff } = require('../../src/parser');
const { log } = require('../../src/lib/logger');

describe('Empty Filepath Validation', () => {
    const testCases = [
        {
            name: 'empty string',
            input: 'FILE: \n+ some content',
            expectedError: 'Empty filepath'
        },
        {
            name: 'whitespace only',
            input: 'FILE:    \n+ some content',
            expectedError: 'Empty filepath'
        },
        {
            name: 'tab character',
            input: 'FILE:\t\n+ some content',
            expectedError: 'Empty filepath'
        }
    ];

    testCases.forEach(({ name, input, expectedError }) => {
        it(`should throw error for ${name}`, () => {
            log(`\n=== Testing ${name} filepath ===`);
            log('Input:', JSON.stringify(input));

            let error;
            try {
                parseSimpleDiff(input);
                assert.fail(`Expected error "${expectedError}" but no error was thrown`);
            } catch (e) {
                error = e;
                log('Caught error:', error);
            }

            // Ensure we got an error
            assert.ok(error, 'Expected an error to be thrown');
            
            // Verify error message
            assert.ok(
                error.message.includes(expectedError),
                `Expected error message to include "${expectedError}" but got: ${error.message}`
            );

            log(`=== ${name} filepath test completed ===\n`);
        });
    });
});
