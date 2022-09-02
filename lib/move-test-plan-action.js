const core = require('@actions/core');
const github = require('@actions/github');

const owner = github.context.repo.owner;
const repo = github.context.repo.repo;
const prNum = github.context.issue.number;
const myToken = core.getInput('githubToken');
const octokit = github.getOctokit(myToken);

(
    async () => {
        try {
            let response = await octokit.rest.pulls.get({
                pull_number: prNum,
                owner: owner,
                repo: repo,
            });

            let labels = response.data.labels.map((label) => label.name);

            if(labels.length === 0){
                labels.push("login");
            }

            labels.forEach((label) => {
                let value = label.replace(/ /g, "_").toUpperCase();
                core.log("THIS IS THE LABEL: " + value);
                let val = true;
                core.exportVariable(value, val);
            });
        } catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    }
)();