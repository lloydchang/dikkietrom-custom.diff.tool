const { validateFiles } = require('../git/git-handler');
const { createBackup } = require('./backup');
const path = require('path');
const fs = require('fs-extra');

async function validateAndBackup(files, backupDir) {
    try {
        // Ensure backup directory exists
        await fs.ensureDir(backupDir);
        
        // Validate files
        await validateFiles(files.map(f => f.file));
        
        // Create backups
        for (const file of files) {
            await createBackup(file.file, backupDir);
        }
    } catch (error) {
        throw new Error(`Validation or backup failed: ${error.message}`);
    }
}

module.exports = {
    validateAndBackup
};
