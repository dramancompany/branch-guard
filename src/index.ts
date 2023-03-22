import { info, setFailed } from '@actions/core';
import { context } from '@actions/github';

import { bgColors, colors, styles } from './const';
import { switchBranch } from './switchBranch';
import { validateBranches } from './validateBranches';

declare const process: {
  env: {
    GITHUB_HEAD_REF: string;
    GITHUB_BASE_REF: string;
  };
};

(async () => {
  try {
    if (context.eventName !== 'pull_request' || !context.payload.pull_request) {
      setFailed('🚫 This action is only available for pull requests.');
    }

    const currentBranch = process.env.GITHUB_HEAD_REF;
    const baseBranch = process.env.GITHUB_BASE_REF;

    info(
      `${colors.yellow}👀 PR의 브랜치(${currentBranch} -> ${baseBranch})가 잘 지정되었는지 살펴 보는중...🤔`,
    );

    const { isValid, correctBaseBranch } = validateBranches({
      currentBranch,
      baseBranch,
    });

    if (isValid) {
      info(`${colors.green}✅ 확인 완료! 👍`);
      return;
    }

    info(`${colors.red}🚫 PR의 브랜치 지정이 잘못되었습니다!`);
    info(`${colors.yellow} Base Branch를 ${correctBaseBranch}로 변경중...🎯`);

    await switchBranch(correctBaseBranch);

    info(
      `${colors.green}✅ Base Branch가 ${colors.white}${bgColors.red}${styles.bold}${baseBranch}${styles.default}${colors.green}에서 ${colors.white}${bgColors.green}${styles.bold}${correctBaseBranch}${styles.default}로 변경되었습니다! 🎉`,
    );
  } catch (error: any) {
    setFailed(error.message);
  }
})();
