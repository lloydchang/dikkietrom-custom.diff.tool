const handleChange = require('./handleChange');

function processChanges(lines, changes) {
    const newLines = [];
    let i = 0, changeIndex = 0;
    
    while (i < lines.length || changeIndex < changes.length) {
        [i, changeIndex] = handleChange(lines, i, changes[changeIndex], changeIndex, newLines);
    }
    
    return newLines;
}

module.exports = processChanges;
