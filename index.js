const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            core.notice("Calling this action");
            core.notice(github.context.issue.number);
            core.notice(github.context.repo);
            core.notice(github.context.owner);

            const myToken = core.getInput('githubToken');
            core.notice(myToken);

            const octokit = github.getOctokit(myToken);

            let response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: github.context.owner,
                repo: github.context.repo,
                issue_number: github.context.issue.number,
                body: "Test Plan: 12345-12345-12345"
              });
            
        } catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    }
)();