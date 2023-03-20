import { execa } from 'execa';

export async function initGitRepo(targetDir: string) {
	const result = await execa('git', ['init'], {
		cwd: targetDir,
	});

	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize git'));
	}

	return true;
}
