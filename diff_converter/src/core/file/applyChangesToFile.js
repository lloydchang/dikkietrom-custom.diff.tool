const fs = require('fs-extra');
const readFileLines = require('./readFileLines');
const processChanges = require('./processChanges');

async function applyChangesToFile(filePath, fileData) {
    try {
        const lines = await readFileLines(filePath);
        const newLines = processChanges(lines, fileData);

        // Add two newlines at the end as per test requirements
        const content = newLines.join('\n') + '\n\n';
        await fs.writeFile(filePath, content);
    } catch (error) {
        throw new Error(`Failed to apply changes to ${filePath}: ${error.message}`);
    }
}

module.exports = applyChangesToFile;
