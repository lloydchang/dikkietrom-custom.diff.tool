const parseFileLine = require('./core/parser/parseFileLine');
const parseChangeLine = require('./core/parser/parseChangeLine');

function parseSimpleDiff(content) {
    // Split content into lines
    const lines = content.trim().split('\n');
    const files = [];
    let currentFile = null;
    
    for (let line of lines) {
        line = line.trim();
        
        // Skip empty lines
        if (!line) continue;
        
        // Check if it's a file declaration line
        if (line.startsWith('FILE: ')) {
            if (currentFile) {
                files.push(currentFile);
            }
            // Let any errors from parseFileLine propagate up
            currentFile = parseFileLine(line);
            continue;
        }
        
        // If we have a current file and the line starts with + or -
        if (currentFile && (line.startsWith('+') || line.startsWith('-'))) {
            const change = parseChangeLine(line);
            if (change) {
                currentFile.changes.push(change);
            }
        }
    }
    
    // Add the last file if exists
    if (currentFile) {
        files.push(currentFile);
    }
    
    return files;
}

module.exports = {
    parseSimpleDiff,
    parseFileLine,
    parseChangeLine
};
