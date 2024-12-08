const { validateFilePath } = require('../validation/validator');
const { log } = require('../../lib/logger');

/**
 * Parse a FILE declaration line
 * @param {string} line - The line to parse
 * @returns {Object} - The parsed file object
 */
function parseFileLine(line) {
    log('Parsing file line:', line);

    if (!line.startsWith('FILE: ')) {
        log('Invalid file header format detected');
        throw new Error('Invalid file header format');
    }

    const filepath = line.substring(6).trim();
    log('Extracted filepath:', filepath);

    // Validate filepath first before any other checks
    validateFilePath(filepath);

    return {
        file: filepath,
        changes: [],
        beforeContext: undefined,
        afterContext: undefined
    };
}

module.exports = parseFileLine;
