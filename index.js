const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            core.notice("Calling this action");
            console.log(github.context.issue.number);
            console.log(github.context.repo);
            console.log(github.context.owner);

            const myToken = core.getInput('githubToken');

            const octokit = github.getOctokit(myToken);

            let response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: "PedroJPerez",
                repo: "aws-slack-notifier",
                issue_number: "1",
                body: "Test Plan: 12345-12345-12345"
              });
            
        } catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    }
)();