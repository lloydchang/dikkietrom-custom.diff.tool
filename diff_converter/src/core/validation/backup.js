const fs = require('fs-extra');
const path = require('path');

async function createBackup(filePath, backupDir) {
    try {
        // Ensure backup directory exists
        await fs.ensureDir(backupDir);
        
        // Generate backup filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = path.basename(filePath);
        const backupPath = path.join(backupDir, `${fileName}.${timestamp}.bak`);
        
        // Copy file to backup location if it exists
        if (await fs.pathExists(filePath)) {
            await fs.copy(filePath, path.join(backupDir, `${fileName}.bak`));
        }
        
        return backupPath;
    } catch (error) {
        throw new Error(`Failed to create backup: ${error.message}`);
    }
}

module.exports = {
    createBackup
};
