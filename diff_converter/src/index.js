const { parseSimpleDiff } = require('./parser');
const { applyDiffChanges } = require('./diff_converter');

module.exports = {
    parseSimpleDiff,
    applyDiffChanges
};
