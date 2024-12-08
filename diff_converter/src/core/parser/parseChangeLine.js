const { validateChangeLine } = require('../validation/validator');
const { log } = require('../../lib/logger');

/**
 * Parse a change line (addition or deletion)
 * @param {string} line - The line to parse
 * @returns {Object} - The parsed change object
 */
function parseChangeLine(line) {
    log('Parsing change line:', line);
    
    const type = line[0];
    const content = line.substring(2);
    
    log('Change type:', type);
    log('Change content:', content);

    // Validate the content with the type first
    validateChangeLine(content, type);

    // Then check marker format
    if (!line.startsWith('+ ') && !line.startsWith('- ')) {
        log('Invalid change marker detected');
        throw new Error('Invalid change marker - must start with + or -');
    }

    return {
        type,
        content: content.trimRight() // Keep leading spaces but remove trailing
    };
}

module.exports = parseChangeLine;
