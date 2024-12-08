const assert = require('assert');
const { applyDiffChanges } = require('../../src/diff_converter');

describe('No Changes Validation', () => {
    it('should throw error when no changes are specified', async function() {
        const input = `FILE: ${this.testFile}\n`;
        await this.fs.writeFile(this.inputFile, input);
        
        try {
            await applyDiffChanges(this.inputFile);
            assert.fail('Should have thrown error for no changes');
        } catch (error) {
            assert.ok(error instanceof Error);
        }
    });
});
