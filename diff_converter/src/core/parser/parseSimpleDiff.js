const parseLine = require('./parseLine');
const { finalizeFiles } = require('./fileParser');

function parseSimpleDiff(content) {
    const files = [];
    let currentFile = null;
    const lines = content.split('\n');
    
    for (const line of lines) {
        currentFile = parseLine(line, files, currentFile);
    }
    
    return finalizeFiles(files, currentFile);
}

module.exports = parseSimpleDiff;
