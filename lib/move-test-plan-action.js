const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            const owner = github.context.repo.owner;
            const repo = github.context.repo.repo;
            const prNum = github.context.issue.number;

            const ref = github.context.ref;

            const myToken = core.getInput('githubToken');

            const octokit = github.getOctokit(myToken);

            let response = await octokit.rest.pulls.get({
                pull_number: prNum,
                owner: owner,
                repo: repo,
              });
            /*
              if (data.length === 0) {
                throw new Error(`No Pull Requests found for ${prNum} (${ref}).`);
              } */ 
              let labels =  response.data.labels.map((label) => label.name);

              console.log(response);

              console.log("LABEL:" , labels);

              labels.forEach((label) =>{
                let value = label.toUpperCase();
                core.exportVariable(value, TRUE);
              })

            /*
            let response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: owner,
                repo: repo,
                issue_number: prNum,
                body: "Test Plan: 4444-5555-6666"
              }); */
            
        } catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    }
)();