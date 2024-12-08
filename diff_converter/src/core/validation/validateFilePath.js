const path = require('path');
const { log } = require('../../lib/logger');

function validateFilePath(filepath) {
    log('=== Starting filepath validation ===');
    log('Input filepath:', filepath);
    log('Filepath type:', typeof filepath);
    log('Filepath length:', filepath ? filepath.length : 0);
    log('Filepath trimmed length:', filepath ? filepath.trim().length : 0);

    // Check for empty filepath first - handle undefined, null, empty string, or whitespace
    if (!filepath || typeof filepath !== 'string' || filepath.trim().length === 0) {
        log('Empty filepath detected - throwing error');
        throw new Error('Empty filepath');
    }

    if (filepath.includes('\n')) {
        log('Newline in filepath detected - throwing error');
        throw new Error('Filepath cannot contain newlines');
    }

    // Convert absolute paths to relative paths if possible
    try {
        // Get the current working directory
        const cwd = process.cwd();
        log('Current working directory:', cwd);

        // If it's an absolute path try to make it relative to cwd
        if (path.isAbsolute(filepath)) {
            log('Absolute filepath detected:', filepath);
            // Check if the path is within the current directory structure
            const relative = path.relative(cwd, filepath);
            log('Relative path:', relative);
            if (relative.startsWith('..')) {
                log('Invalid relative path detected - throwing error');
                throw new Error('Filepath must be relative');
            }
        } else {
            log('Filepath is relative:', filepath);
        }

        log('=== Filepath validation successful ===');
    } catch (error) {
        log('Error during filepath validation:', error.message);
        throw error;
    }
}

module.exports = validateFilePath;
