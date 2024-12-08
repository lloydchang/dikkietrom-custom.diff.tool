const fs = require('fs-extra');

async function readFileLines(filePath) {
    try {
        if (await fs.pathExists(filePath)) {
            const content = await fs.readFile(filePath, 'utf8');
            // Split by newlines and remove any empty lines at start/end
            return content.split('\n').filter((line, index, arr) => {
                // Keep non-empty lines and empty lines that are between content
                return line.trim() || (index > 0 && index < arr.length - 1);
            });
        }
        return [];
    } catch (error) {
        throw new Error(`Failed to read file: ${error.message}`);
    }
}

module.exports = readFileLines;
