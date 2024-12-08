async function validateFiles(files) {
    const fs = require('fs-extra');
    for (const file of files) {
        if (!await fs.pathExists(file)) {
            throw new Error(`File not found: ${file}`);
        }
    }
}

module.exports = validateFiles;
