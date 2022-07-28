const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            core.notice("Calling this action");
            core.notice(github.context.issue.number);

            const myToken = core.getInput('githubToken');
            core.notice(myToken);

            const octokit = github.getOctokit(myToken);

            let response = await octokit.rest.issues.createComment(
                {
                issue_number: github.context.issue.number, 
                body: `This is a test for PR ${github.context.issue.number}`, 
                owner: github.context.owner,
                repo: github.context.repo
            });
            
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();