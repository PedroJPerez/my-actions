const core = require('@actions/core');
const github = require('@actions/github');

(
    async () => {
        try {
            core.notice("Calling this action");
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();