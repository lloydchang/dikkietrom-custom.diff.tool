#!/usr/bin/env node
const { applyDiffChanges } = require('./diff_converter');

const diffFile = process.argv[2];
if (!diffFile) {
    console.error('Please provide a diff file path');
    process.exit(1);
}

console.log('Starting diff conversion...');
console.log('Input file:', diffFile);

applyDiffChanges(diffFile)
    .then(() => {
        console.log('Changes applied successfully');
    })
    .catch(err => {
        console.error('Error applying changes:', err);
        console.error(err.stack);
        process.exit(1);
    });
