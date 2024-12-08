const assert = require('assert');
const { applyDiffChanges } = require('../../src/diff_converter');

describe('Invalid Change Marker Validation', () => {
    it('should throw error when change marker is invalid', async function() {
        const input = `FILE: ${this.testFile}\n* invalid line\n`;
        await this.fs.writeFile(this.inputFile, input);
        
        try {
            await applyDiffChanges(this.inputFile);
            assert.fail('Should have thrown error for invalid change marker');
        } catch (error) {
            assert.ok(error instanceof Error);
        }
    });
});
