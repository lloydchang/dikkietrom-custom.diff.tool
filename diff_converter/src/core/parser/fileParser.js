const { validateCurrentFile } = require('../validation/validator');

function finalizeFiles(files, currentFile) {
    validateCurrentFile(currentFile);
    if (currentFile) {
        files.push(currentFile);
    }
    return files;
}

module.exports = {
    finalizeFiles
};
