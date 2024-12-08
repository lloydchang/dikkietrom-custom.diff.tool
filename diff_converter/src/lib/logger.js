// Global logging flag
let isLoggingEnabled = true;

/**
 * Controls whether logging is enabled
 * @param {boolean} enabled - Whether to enable logging
 */
function setLogging(enabled) {
    isLoggingEnabled = enabled;
}

/**
 * Log messages if logging is enabled
 * @param {...any} args - Arguments to log
 */
function log(...args) {
    if (isLoggingEnabled) {
        console.log(...args);
    }
}

module.exports = {
    log,
    setLogging
};
