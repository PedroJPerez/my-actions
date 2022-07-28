const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            core.notice("Calling this action");
            core.notice(github.context.issue.number);
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();