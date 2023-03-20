import { execa } from 'execa';

export async function initEslint(targetDir: string) {
	const resultInit = await execa('npm', ['eslint --init -y'], {
		cwd: targetDir,
	});

	if (resultInit.failed) {
		return Promise.reject(new Error('Failed to initialize eslint'));
	}

	// const resultCheckCommand = await execa('npm', ['pkg set scripts.lint:check="eslint ./"'], {
	//     cwd: targetDir
	// });

	// if (resultCheckCommand.failed) {
	//     return Promise.reject(new Error('Failed to add eslint check command'));
	// }

	// const resultFixCommand = await execa('npm', ['pkg set scripts.lint:fix="eslint ./ --fix"'], {
	//     cwd: targetDir
	// });

	// if (resultFixCommand.failed) {
	//     return Promise.reject(new Error('Failed to add eslint fix command'));
	// }

	return true;
}
