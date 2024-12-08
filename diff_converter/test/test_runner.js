const fs = require('fs-extra');
const path = require('path');
const { setLogging } = require('../src/lib/logger');

// Disable logging during tests
setLogging(false);

describe('Diff Converter Tests', () => {
    beforeEach(async function() {
        // Set up test context that will be available to all tests
        this.fs = fs;
        this.testDir = path.join(__dirname, 'temp');
        this.inputFile = path.join(this.testDir, 'input.sdf'); // Changed to .sdf extension
        this.testFile = path.join(this.testDir, 'test.html');

        // Create test directory and file
        await fs.ensureDir(this.testDir);
        await fs.writeFile(this.testFile, '<div>Test</div>\n');
    });

    afterEach(async function() {
        try {
            await fs.remove(this.testDir);
        } catch (err) {
            console.error('Error cleaning up:', err);
        }
    });

    // Require all test files
    require('./validation/missing_file_header_test');
    require('./validation/empty_filepath_test');
    require('./validation/no_changes_test');
    require('./validation/invalid_marker_test');
    require('./validation/empty_addition_test');
    require('./multiple_files_test');
    require('./single_file_test');
    require('./context_test'); // Add the new context test
});
