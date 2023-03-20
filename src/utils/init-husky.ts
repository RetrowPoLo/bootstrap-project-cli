import { execa } from 'execa';

export async function initHusky(targetDir: string) {
	const result = await execa('npx', ['husky-init'], {
		cwd: targetDir,
	});

	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize husky'));
	}

	return true;
}
