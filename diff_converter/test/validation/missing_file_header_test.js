const assert = require('assert');
const { applyDiffChanges } = require('../../src/diff_converter');

describe('Missing FILE Header Validation', () => {
    it('should throw error when FILE header is missing', async function() {
        const input = '+ new line\n- old line\n';
        await this.fs.writeFile(this.inputFile, input);
        
        try {
            await applyDiffChanges(this.inputFile);
            assert.fail('Should have thrown error for missing FILE header');
        } catch (error) {
            assert.ok(error instanceof Error);
        }
    });
});
