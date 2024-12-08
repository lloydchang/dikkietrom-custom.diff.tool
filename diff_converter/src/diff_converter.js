const fs = require('fs-extra');
const path = require('path');
const { parseSimpleDiff } = require('./core/parser/parser');
const { validateAndBackup } = require('./core/validation/validateAndBackup');
const { applyChangesToFiles } = require('./core/file/applyChanges');
const { commitChanges } = require('./core/git/git-handler');

async function applyDiffChanges(diffFile) {
    const content = await fs.readFile(diffFile, 'utf8');
    const files = parseSimpleDiff(content);
    const backupDir = path.join(path.dirname(diffFile), '.backups');
    
    await validateAndBackup(files, backupDir);
    await applyChangesToFiles(files);
    await commitChanges(files.map(f => f.file));
}

module.exports = {
    applyDiffChanges
};
