const { applyChangesToFile } = require('./file-handler');

async function applyChangesToFiles(files) {
    for (const fileData of files) {
        await applyChangesToFile(fileData.file, fileData);
    }
}

module.exports = {
    applyChangesToFiles
};
