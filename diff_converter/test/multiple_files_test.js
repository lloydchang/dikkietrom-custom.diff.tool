const assert = require('assert');
const { applyDiffChanges } = require('../src/diff_converter');
const simpleGit = require('simple-git');
const path = require('path');

describe('Multiple File Changes', () => {
    it('should process changes to multiple files', async function() {
        this.timeout(5000);
        
        // Additional test-specific files
        const testCssFile = path.join(this.testDir, 'test.css');
        const backupDir = path.join(this.testDir, '.backups');
        
        // Git setup specific to this test
        const git = simpleGit(this.testDir);
        await git.init();
        await git.addConfig('user.name', 'Test User');
        await git.addConfig('user.email', 'test@example.com');
        
        // Create initial test files
        await this.fs.writeFile(this.testFile, '<div>Old Header</div>\n');
        await this.fs.writeFile(testCssFile, '.old-header { color: red; }\n');
        await git.add('.');
        await git.commit('Initial commit');

        try {
            const input = `FILE: ${this.testFile}
- <div>Old Header</div>
+ <div class="header">New Header</div>

FILE: ${testCssFile}
- .old-header { color: red; }
+ .header { color: blue; }`;

            await this.fs.writeFile(this.inputFile, input);
            await applyDiffChanges(this.inputFile);

            // Verify HTML changes
            const htmlContent = await this.fs.readFile(this.testFile, 'utf8');
            assert.strictEqual(htmlContent, '<div class="header">New Header</div>\n\n');

            const htmlBackup = path.join(backupDir, 'test.html.bak');
            const htmlBackupContent = await this.fs.readFile(htmlBackup, 'utf8');
            assert.strictEqual(htmlBackupContent, '<div>Old Header</div>\n');

            // Verify CSS changes
            const cssContent = await this.fs.readFile(testCssFile, 'utf8');
            assert.strictEqual(cssContent, '.header { color: blue; }\n\n');

            const cssBackup = path.join(backupDir, 'test.css.bak');
            const cssBackupContent = await this.fs.readFile(cssBackup, 'utf8');
            assert.strictEqual(cssBackupContent, '.old-header { color: red; }\n');

            // Verify git status
            const status = await git.status();
            assert.ok(status.modified.length > 0 || status.staged.length > 0, 'Expected files to be modified');
        } catch (err) {
            console.error('Test error:', err);
            throw err;
        }
    });
});
