const parseFileLine = require('./parseFileLine');
const parseChangeLine = require('./parseChangeLine');

function parseLine(line, files, currentFile) {
    // Handle empty lines
    if (!line.trim()) {
        return currentFile;
    }

    if (line.startsWith('FILE: ')) {
        if (currentFile) {
            files.push(currentFile);
        }
        return parseFileLine(line);
    }

    if (!currentFile) {
        throw new Error('No FILE header found before changes');
    }

    // Handle context sections
    if (line.startsWith('CONTEXT BEFORE:')) {
        currentFile.beforeContext = [];
        currentFile.inBeforeContext = true;
        currentFile.inAfterContext = false;
        return currentFile;
    }

    if (line.startsWith('CONTEXT AFTER:')) {
        currentFile.afterContext = [];
        currentFile.inBeforeContext = false;
        currentFile.inAfterContext = true;
        return currentFile;
    }

    // Add lines to appropriate context or changes
    if (currentFile.inBeforeContext && !line.startsWith('+ ') && !line.startsWith('- ')) {
        currentFile.beforeContext.push(line);
        return currentFile;
    }

    if (currentFile.inAfterContext && !line.startsWith('+ ') && !line.startsWith('- ')) {
        currentFile.afterContext.push(line);
        return currentFile;
    }

    if (line.startsWith('+ ') || line.startsWith('- ')) {
        // When we hit changes, we're no longer in any context section
        currentFile.inBeforeContext = false;
        currentFile.inAfterContext = false;
        currentFile.changes.push(parseChangeLine(line));
        return currentFile;
    }

    return currentFile;
}

module.exports = parseLine;
