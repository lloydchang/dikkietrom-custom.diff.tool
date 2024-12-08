function validateChangeLine(content, type) {
    // Check for undefined or null
    if (content === undefined || content === null) {
        if (type === '+') {
            throw new Error('Empty addition');
        } else {
            throw new Error('Empty deletion');
        }
    }

    // Check for empty string or whitespace only
    if (content.trim().length === 0) {
        if (type === '+') {
            throw new Error('Empty addition');
        } else {
            throw new Error('Empty deletion');
        }
    }
}

module.exports = validateChangeLine;
