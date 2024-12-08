const assert = require('assert');
const { applyDiffChanges } = require('../src/diff_converter');
const path = require('path');
const { log } = require('../src/lib/logger');

describe('Context-Aware Changes', () => {
    it('should process changes with context', async function() {
        this.timeout(5000);

        log('\n=== Context-Aware Changes Test ===');

        // Create initial test file with some content
        const content = `<div class="header">
  <h1>Welcome</h1>
</div>
<p>Old text here</p>
<div class="footer">
  <p>Footer content</p>
</div>`;
        
        log('\nInitial content:');
        log(content);
        
        await this.fs.writeFile(this.testFile, content);

        // Create the .sdf file with context
        const input = `FILE: ${this.testFile}
CONTEXT BEFORE:
<div class="header">
  <h1>Welcome</h1>
</div>
- <p>Old text here</p>
+ <p>New text here</p>
CONTEXT AFTER:
<div class="footer">
  <p>Footer content</p>
</div>`;

        log('\nInput file content:');
        log(input);
        
        await this.fs.writeFile(this.inputFile, input);

        log('\nApplying changes...');
        await applyDiffChanges(this.inputFile);

        // Verify changes
        const newContent = await this.fs.readFile(this.testFile, 'utf8');
        log('\nActual content after changes:');
        log(newContent);

        const expected = `<div class="header">
  <h1>Welcome</h1>
</div>
<p>New text here</p>
<div class="footer">
  <p>Footer content</p>
</div>

`;
        log('\nExpected content:');
        log(expected);

        log('\nComparing actual vs expected:');
        log('Actual length:', newContent.length);
        log('Expected length:', expected.length);
        log('Content matches:', newContent === expected);
        
        if (newContent !== expected) {
            log('\nDetailed comparison:');
            const actualLines = newContent.split('\n');
            const expectedLines = expected.split('\n');
            
            log('\nActual lines:', actualLines.length);
            log('Expected lines:', expectedLines.length);
            
            for (let i = 0; i < Math.max(actualLines.length, expectedLines.length); i++) {
                if (actualLines[i] !== expectedLines[i]) {
                    log(`\nDifference at line ${i + 1}:`);
                    log('Actual  :', JSON.stringify(actualLines[i]));
                    log('Expected:', JSON.stringify(expectedLines[i]));
                }
            }
        }

        assert.strictEqual(newContent, expected);
    });
});
