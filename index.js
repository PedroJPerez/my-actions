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

            let response = await octokit.rest.pulls.createReviewComment(
                {
                pull_number: github.context.issue.number,
                body: `This is a test for PR ${github.context.issue.number}`, 
                owner: github.context.owner,
                repo: github.context.repo
            });
            
        } catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    }
)();