const validateFilePath = require('./validateFilePath');

function validateCurrentFile(currentFile) {
    // Skip validation if currentFile is null/undefined - this is valid when we've processed all files
    if (!currentFile) return;
    
    // Only validate if we have a currentFile that hasn't been finalized yet
    if (currentFile.filepath) {
        validateFilePath(currentFile.filepath);
        
        if (!currentFile.changes || currentFile.changes.length === 0) {
            throw new Error('No changes specified for file');
        }
    }
}

module.exports = validateCurrentFile;
