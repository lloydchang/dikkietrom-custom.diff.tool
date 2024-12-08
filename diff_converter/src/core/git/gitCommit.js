const simpleGit = require('simple-git');

async function commitChanges(files) {
    const git = simpleGit();
    await git.add(files);
    await git.commit('Applied changes from diff');
}

module.exports = commitChanges;
