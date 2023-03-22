# Branch Guard

- This action makes sure the current branch tries to merge into the right base branch on pull request
- **What's right** is based on [git-flow branching strategy](https://nvie.com/posts/a-successful-git-branching-model/)

## Inputs

| Name              | Required | Description                                | Default     |
| ----------------- | -------- | ------------------------------------------ | ----------- |
| `githubToken`     | ✅       | Github Token that has access to repository | -           |
| `mainBranch`      |          | Branch name for production releases        | `"main"`    |
| `devBranch`       |          | Branch name for development                | `"develop"` |
| `featureBranch`   |          | Branch name prefix for feature             | `"feature"` |
| `releaseBranch`   |          | Branch name prefix for release             | `"release"` |
| `hotfixBranch`    |          | Branch name prefix for hotfix              | `"hotfix"`  |
| `prefixSeparator` |          | Branch name prefix separator               | `"/"`       |

## Example usage

```yaml
on: [pull_request]

jobs:
  check_branches_on_pr:
    runs-on: ubuntu-latest
    name: Check Branches on PR
    steps:
      - name: Check Branches on PR
        uses: dramancompany/branch-guard@v1.0.0
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
```

## 배포 순서

### 1. package.json의 버전 수정

### 2. 빌드

```bash
$ pnpm build
```

### 3. main 브랜치에 merge 혹은 push

### 4. 버전 태그 생성

```
$ git tag -am "v1.0.0" v1.0.0
$ git push --follow-tags
```

### 5. Github Release 생성

![image](https://user-images.githubusercontent.com/28733869/226802590-c4e23c60-85ad-4147-b369-c80e30a0f217.png)
![image](https://user-images.githubusercontent.com/28733869/226802836-4ce59161-5254-4fd5-962b-1c2e94771bcb.png)
