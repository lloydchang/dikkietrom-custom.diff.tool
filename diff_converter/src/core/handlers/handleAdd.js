function handleAdd(change, changeIndex, newLines) {
    newLines.push(change.content);
    return changeIndex + 1;
}

module.exports = handleAdd;
