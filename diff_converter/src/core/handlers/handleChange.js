const handleNoChange = require('./handleNoChange');
const handleDelete = require('./handleDelete');
const handleAdd = require('./handleAdd');

function handleChange(lines, i, change, changeIndex, newLines) {
    if (!change) {
        return [handleNoChange(lines, i, newLines), changeIndex];
    }
    
    if (change.type === 'delete') {
        return handleDelete(lines, i, change, changeIndex, newLines);
    }
    return [i, handleAdd(change, changeIndex, newLines)];
}

module.exports = handleChange;
