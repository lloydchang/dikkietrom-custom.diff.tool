function handleNoChange(lines, i, newLines) {
    newLines.push(lines[i]);
    return i + 1;
}

module.exports = handleNoChange;
