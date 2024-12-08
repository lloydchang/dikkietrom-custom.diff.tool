const fs = require('fs-extra');
const path = require('path');

async function createBackup(filePath, backupDir) {
    const backupPath = path.join(backupDir, `${path.basename(filePath)}.bak`);
    await fs.ensureDir(backupDir);
    await fs.copy(filePath, backupPath);
}

module.exports = {
    createBackup
};
