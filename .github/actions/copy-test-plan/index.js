const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            const owner = github.context.repo.owner;
            const repo = github.context.repo.repo;
            const prNum = github.context.issue.number;

            const myToken = core.getInput('githubToken');

            const octokit = github.getOctokit(myToken);

            let response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: owner,
                repo: repo,
                issue_number: prNum,
                body: "Test Plan: 12345-12345-12345"
              });
            
        } catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    }
)();