const assert = require('assert');
const { applyDiffChanges } = require('../src/diff_converter');
const simpleGit = require('simple-git');
const path = require('path');

describe('Single File Changes', () => {
    it('should process a valid diff file', async function() {
        this.timeout(5000);
        
        const backupDir = path.join(this.testDir, '.backups');
        
        // Git setup specific to this test
        const git = simpleGit(this.testDir);
        await git.init();
        await git.addConfig('user.name', 'Test User');
        await git.addConfig('user.email', 'test@example.com');
        
        await this.fs.writeFile(this.testFile, '<div>Old Header</div>\n');
        await git.add('.');
        await git.commit('Initial commit');

        try {
            const input = `FILE: ${this.testFile}
- <div>Old Header</div>
+ <div class="header">New Header</div>`;
            
            await this.fs.writeFile(this.inputFile, input);
            await applyDiffChanges(this.inputFile);

            const content = await this.fs.readFile(this.testFile, 'utf8');
            assert.strictEqual(content, '<div class="header">New Header</div>\n\n');

            const backupFile = path.join(backupDir, 'test.html.bak');
            const backupContent = await this.fs.readFile(backupFile, 'utf8');
            assert.strictEqual(backupContent, '<div>Old Header</div>\n');

            const status = await git.status();
            assert.ok(status.modified.length > 0 || status.staged.length > 0, 'Expected file to be modified');
        } catch (err) {
            console.error('Test error:', err);
            throw err;
        }
    });
});
