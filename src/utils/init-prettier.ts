import { execa } from 'execa';

export async function initPrettier(targetDir: string) {
	const result = await execa('echo', [' {} > .prettierrc.json'], {
		cwd: targetDir,
	});

	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize prettier'));
	}

	return true;
}
