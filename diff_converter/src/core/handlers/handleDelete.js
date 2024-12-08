function handleDelete(lines, i, change, changeIndex, newLines) {
    if (lines[i].trim() === change.content.trim()) {
        return [i + 1, changeIndex + 1];
    }
    newLines.push(lines[i]);
    return [i + 1, changeIndex];
}

module.exports = handleDelete;
