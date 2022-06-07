const { Octokit } = require("@octokit/rest");

class GitHubApiUtils {

    static async isValidRepository(str) {

        if (!str) {
            throw new Error("Repository should not be null or underfined");
        }

        return /(.+)\/(.+)/gm.test(str);
    }

    static async getRepository() {

        const repository = process.env["GITHUB_REPOSITORY"];

        if (!GitHubApiUtils.isValidRepository(repository)) {
            throw new Error(`${repository} is invalid`);
        }

        const [owner, repo] = repository.split("/");

        return { owner, repo };
    }

    static async getLatestRelease() {

        const octokit = new Octokit();

        const repoInfo = GitHubApiUtils.getRepository();

        let releases = await octokit.rest.repos.listReleases(repoInfo);

        releases = releases.data;

        let { id, currentRelease } = "";

        if (releases.length) {
            id = String(releases[0].id);
            currentRelease = releases[0].name;
        }

        return { id, currentRelease };
    }
}

exports.GitHubApiUtils = GitHubApiUtils;
