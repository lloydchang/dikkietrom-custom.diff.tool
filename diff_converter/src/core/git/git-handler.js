const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const fs = require('fs').promises;
const path = require('path');
const { log } = require('../../lib/logger');

async function validateFiles(files) {
    try {
        // Check if git repo exists
        await execAsync('git rev-parse --is-inside-work-tree');

        // Check if files exist and are tracked
        for (const file of files) {
            try {
                await execAsync(`git ls-files --error-unmatch "${file}"`);
            } catch (error) {
                // If file doesn't exist yet that's okay - it will be created
                if (!error.message.includes('did not match any file')) {
                    throw new Error(`File ${file} is not tracked in git`);
                }
            }
        }
    } catch (error) {
        throw new Error(`Git validation failed: ${error.message}`);
    }
}

async function commitChanges(files) {
    try {
        // Configure git if not already configured
        try {
            const { stdout: userName } = await execAsync('git config --get user.name');
            const { stdout: userEmail } = await execAsync('git config --get user.email');
            log('Git config found:', { userName: userName.trim(), userEmail: userEmail.trim() });
        } catch (error) {
            log('Setting temporary git config...');
            await execAsync('git config --local user.name "Diff Converter"');
            await execAsync('git config --local user.email "diff@converter.local"');
        }

        // Verify files exist
        for (const file of files) {
            try {
                await fs.access(file);
            } catch (error) {
                throw new Error(`File not found: ${file}`);
            }
        }

        // Stage files one by one
        log('Staging files:', files);
        for (const file of files) {
            try {
                // Use relative path for git commands
                const relativePath = path.relative(process.cwd(), file);
                await execAsync(`git add "${relativePath}"`);
                log(`Successfully staged: ${file}`);
            } catch (error) {
                throw new Error(`Failed to stage ${file}: ${error.message}`);
            }
        }

        // Check if there are staged changes
        const { stdout: status } = await execAsync('git status --porcelain');
        const stagedChanges = status.split('\n')
            .filter(line => line.match(/^[MADRC]/))
            .map(line => line.substring(3));
        
        if (stagedChanges.length === 0) {
            log('No staged changes to commit');
            return false;
        }

        // Create commit with relative paths
        const fileList = files.map(file => path.relative(process.cwd(), file)).join(' ');
        const commitCommand = `git commit -m "Applied changes to: ${fileList}"`;
        
        try {
            const { stdout, stderr } = await execAsync(commitCommand);
            log('Commit command:', commitCommand);
            log('Commit output:', stdout);
            if (stderr) log('Commit stderr:', stderr);
            return true;
        } catch (error) {
            const fullError = `${error.message}\nCommand output: ${error.stdout || ''}\n${error.stderr || ''}`;
            throw new Error(`Failed to commit changes: ${fullError}`);
        }
    } catch (error) {
        log('Git operation failed:', error);
        throw error;
    }
}

module.exports = {
    validateFiles,
    commitChanges
};
