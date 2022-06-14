import { Octokit } from 'octokit';
import { Endpoints } from '@octokit/types';
import { getAllPages } from 'src/utils/getAllPages';

type GitHupApiParam<T extends keyof Endpoints> = Endpoints[T]['parameters'];
class GitHubApi {
  public api: InstanceType<typeof Octokit>;
  public owner = 'OWNER';
  constructor(args: { token: string; owner?: string }) {
    this.owner = args.owner;
    this.api = new Octokit({
      auth: args.token,
    });
  }

  createIssue = async (param: {
    repo: string; //
    title: string;
    body: string;
    assignees: string[];
  }) => {
    const { assignees, body, repo, title } = param;
    return await this.api.request('POST /repos/{owner}/{repo}/issues', {
      owner: 'OWNER',
      repo,
      title,
      body,
      assignees,
    });
  };

  getRepos = async (options: GitHupApiParam<'GET /orgs/{org}/repos'>) => {
    return await this.api.request('GET /orgs/{org}/repos', {
      ...options,
    });
  };

  getAllRepos = async (
    options: Omit<GitHupApiParam<'GET /orgs/{org}/repos'>, 'page'>,
  ) => {
    return getAllPages(
      async ({ page }) => (await this.getRepos({ ...options, page })).data,
    );
  };

  getRepoComments = async (repo: string) => {
    return this.api.request('GET /repos/{owner}/{repo}/comments', {
      owner: this.owner,
      repo,
    });
  };

  getSource = async (param: { repo: string; path: string }) => {
    return await this.api.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: this.owner,
      mediaType: {
        format: 'row',
      },
      ...param,
    });
  };
}

export default GitHubApi;
